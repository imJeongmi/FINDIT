import pymysql as pymysql
import torch
import requests
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from starlette.responses import JSONResponse

import cv2
import numpy as np

from config.dbConfig import host, port, username, password, dbname
from models.experimental import attempt_load
from utils.datasets import letterbox
from utils.general import non_max_suppression, check_img_size
from utils.torch_utils import select_device

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

opt = {
    "weights": "best (17).pt",
    # "weights": "best.pt",  # Path to weights file default weights are for nano model
    "img-size": 640,  # default image size
    "conf-thres": 0.70,  # confidence threshold for inference.
    "iou-thres": 0.45,  # NMS IoU threshold for inference.
    "device": 'cpu'  # device to run our model i.e. 0 or 0,1,2,3 or cpu
}

weights, imgsz = opt['weights'], opt['img-size']
device = select_device(opt['device'])
half = device.type != 'cpu'
model = attempt_load(weights, map_location=device)  # load FP32 model
stride = int(model.stride.max())  # model stride
imgsz = check_img_size(imgsz, s=stride)  # check img_size
if half:
    model.half()
names = model.module.names if hasattr(model, 'module') else model.names
if device.type != 'cpu':
    model(torch.zeros(1, 3, imgsz, imgsz).to(device).type_as(next(model.parameters())))

IGT = {}
Default_IGT = {}
Custom_IGT = {}



@app.post("/check")
async def upload_file(file: UploadFile = File(...), game_id: str = Form()):
    db = pymysql.connect(host=host,
                         port=port,
                         user=username,
                         password=password,
                         db=dbname,
                         charset='utf8')
    print(game_id)
    cursor = db.cursor()

    sql = """SELECT game_id
               FROM game
              WHERE entercode = '%s'""" % (game_id)
    cursor.execute(sql)
    row = cursor.fetchone()

    if (row is None):
        return JSONResponse(content={"message": "WRONG_ENTERCODE"},
                            status_code=500)
    game_id = row[0]
    print(game_id)

    if not (game_id in IGT):
        digt = []
        cigt = {}

        sql = """SELECT igt.treasure_id, treasure.image_url, treasure.is_default, treasure.treasure_name
                   FROM igt, treasure 
                  WHERE igt.treasure_id = treasure.treasure_id 
                    AND igt.game_id = '%s'""" % (game_id)
        cursor.execute(sql)

        row = cursor.fetchall()

        if (row is None):
            # DB에 보물이 등록되어 있지 않다.
            # WRONG GAME_ID or WRONG DB
            return JSONResponse(content={"message": "NO_IGT_DB"},
                                status_code=500)

        for tid, tulr, isD, tname in row:
            if isD == b'\x01':
                digt.append(tid)
            else:
                cigt[tid] = [tname, tulr]
        Default_IGT[game_id] = digt
        Custom_IGT[game_id] = cigt
        IGT[game_id] = row

        print(IGT[game_id])

    img = cv2.imdecode(np.fromstring(file.file.read(), np.uint8), cv2.IMREAD_COLOR)
    ori_img = img;

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    img = letterbox(img, imgsz, stride=stride)[0]
    img = img[:, :, ::-1].transpose(2, 0, 1)  # BGR to RGB, to 3x416x416
    img = np.ascontiguousarray(img)
    img = torch.from_numpy(img).to(device)
    img = img.half() if half else img.float()  # uint8 to fp16/32
    img /= 255.0  # 0 - 255 to 0.0 - 1.0
    if img.ndimension() == 3:
        img = img.unsqueeze(0)

    # result = model(img_rgb, size = 640)
    result = model(img, augment=True)[0]
    # print(result)
    result = non_max_suppression(result, opt['conf-thres'], opt['iou-thres'], classes=[range(17)], agnostic=False)

    # Process detections
    # print(result)
    for i, det in enumerate(result):
        s = []
        if len(det):
            for c in det[:, -1].unique():
                # IGT에 등록된 보물인지 확인한다.
                if (int(c) + 1) in Default_IGT[game_id]:
                    n = (det[:, -1] == c).sum()  # detections per class
                    s.append(int(c) + 1)

    if len(s) == 0:
        ## CUSTOM 보물인지 확인한다.
        for custom in Custom_IGT[game_id]:
            print(custom)
            customImg = np.asarray(bytearray(requests.get(Custom_IGT[game_id][custom][1]).content), dtype=np.uint8)
            answerImg = cv2.imdecode(np.fromstring(customImg, np.uint8), cv2.IMREAD_GRAYSCALE)

            if matchCheck(ori_img, answerImg):
                s.append(custom)

    elif len(s) > 1:
        print("Many Item")
        print(s)
        return JSONResponse(content={"message" : "MANY ITEMS"},status_code=400)

    # 보물이 사진에 없다.
    if len(s) == 0:
        return JSONResponse(content={"message": "NOT TREASURE"},
                            status_code=200)

    return JSONResponse(content={"result": s[0]},
                        status_code=200)


# 답지 이미지, 사용자 이미지
def matchCheck(src1, src2):
    if src1 is None or src2 is None:
        print('Image load failed!')
        return False

    # 특징점 알고리즘 객체 생성
    orb = cv2.ORB_create()
    # orb = cv2.KAZE_create()

    # 특징점 검출 및 기술자 계산
    keypoints1, desc1 = orb.detectAndCompute(src1, None)
    keypoints2, desc2 = orb.detectAndCompute(src2, None)

    # 특징점 매칭
    matcher = cv2.BFMatcher_create(cv2.NORM_HAMMING)
    matches = matcher.match(desc1, desc2)

    # 좋은 매칭 결과 선별
    matches = sorted(matches, key=lambda x: x.distance)
    good_matches = matches[:50]

    # 호모그래피 계산
    # DMatch 객체에서 queryIdx와 trainIdx를 받아와서 크기와 타입 변환하기
    pts1 = np.array([keypoints1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2).astype(np.float32)
    pts2 = np.array([keypoints2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2).astype(np.float32)

    # pts1과 pts2의 행렬 주의
    H, _ = cv2.findHomography(pts1, pts2, cv2.RANSAC)

    # 호모그래피를 이용하여 기준 영상 영역 표시
    dst = cv2.drawMatches(src1, keypoints1, src2, keypoints2, good_matches, None,
                          flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)
    (h, w) = src1.shape[:2]

    # 입력 영상의 모서리 4점 좌표
    corners1 = np.array([[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]).reshape(-1, 1, 2).astype(np.float32)

    # 입력 영상에 호모그래피 H 행렬로 투시 변환
    corners2 = cv2.perspectiveTransform(corners1, H)

    # 입력 영상에 호모그래피 H 행렬로 투시 변환
    corners2 = corners2 + np.float32([w, 0])

    # 넓이
    area = cv2.contourArea(np.int32(corners2), oriented=None)

    # 넓이가 화면에 1/4이면 못찾은걸로 취급
    if area < (src2.shape[0] * src2.shape[1]) / 4:
        return False
    return True

