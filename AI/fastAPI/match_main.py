from fastapi import FastAPI, UploadFile, File, Form
from starlette.responses import JSONResponse
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np

import torch

app = FastAPI()

@app.post("/uploadMatch")
async def match_file(file: UploadFile = File(...), player_id: str = Form()):
    print(file.filename)
    print(player_id)

    answer = cv2.imread('./img/gosommi.png', cv2.IMREAD_GRAYSCALE)
    img = cv2.imdecode(np.fromstring(file.file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)

    if answer is None or img is None:
        print('Image load failed!')
        return

    orb = cv2.ORB_create()

    keypoints1, desc1 = orb.detectAndCompute(answer, None)
    keypoints2, desc2 = orb.detectAndCompute(orb, None)

    matcher = cv2.BFMatcher_create(cv2.NORM_HAMMING)
    matches = matcher.match(desc1, desc2)

    matches = sorted(matches, key=lambda x: x.distance)
    good_matches = matches[:50]

    pts1 = np.array([keypoints1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2).astype(np.float32)
    pts2 = np.array([keypoints2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2).astype(np.float32)

    H, _ = cv2.findHomography(pts1, pts2, cv2.RANSAC)


    print(result)

    print(json_results)

    return JSONResponse(content={"result": json_results},
                        status_code=200)

def results_to_json(results):
    ''' Converts yolo model output to json (list of list of dicts)'''
    return [
                [
                    {
                    "class_name": model.model.names[int(pred[5])],
                    }
                for pred in result
                ]
            for result in results.xyxy
            ]
