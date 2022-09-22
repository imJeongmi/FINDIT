from fastapi import FastAPI, UploadFile, File, Form
from starlette.responses import JSONResponse
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np

import torch

app = FastAPI()

model = torch.hub.load('yolov5-master', 'custom', path='best.pt', source='local')

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), player_id: str = Form()):
    print(file.filename)
    print(player_id)

    img = cv2.imdecode(np.fromstring(file.file.read(), np.uint8), cv2.IMREAD_COLOR)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    result = model(img_rgb, size = 640)
    json_results = results_to_json(result)

    print(result)

    print(json_results)

    return JSONResponse(content={"result": json_results},
                        status_code=200)

@app.post("/match")
async def match_file(file: UploadFile = File(...), player_id: str = Form()):
    print(file.filename)
    print(player_id)


    img = cv2.imdecode(np.fromstring(file.file.read(), np.uint8), cv2.IMREAD_COLOR)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    result = model(img_rgb, size = 640)
    json_results = results_to_json(result)

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
