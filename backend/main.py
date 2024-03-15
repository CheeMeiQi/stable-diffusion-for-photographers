from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import StreamingResponse, Response
import fastapi as _fapi
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from typing import List

import imagePrompt as _imagePrompt
import txt2imgAPI as _txt2imgAPI
from auth_token import loraAPIkey_novita
import requests
import json
import traceback
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add the origin of your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.post("/api/generate/")
# async def generate_image(request: _imagePrompt.ImageCreate):
    
#     image = await _txt2imgAPI.generate_image(imgPrompt=request)
#     file_name = f"{request.prompt}_seed_{request.seed}_guidance_{request.guidance_scale}_steps_{request.num_inference_steps}.png"
#     image.save(f"./images/{file_name}")
#     buffer = BytesIO()
#     image.save(buffer, format="PNG")
#     buffer.seek(0)
#     #imgstr = base64.b64encode(buffer.getvalue())
    
#     return StreamingResponse(buffer, media_type="image/png")

@app.post("/api/getAndUploadImages/")
def getAndUploadImage(file: UploadFile = File(...)):

    try:
        fileName = file.filename
        fileExtension = fileName.split('.')[-1]
        print("file extension: ", fileExtension)
        url = "https://api.novita.ai/v3/assets/training_dataset"
        headers = {
            'Authorization': 'Bearer' + loraAPIkey_novita,
            'Content-Type': 'application/json'
        }
        payload = json.dumps({ 'file_extension': fileExtension })

        try:
            # 1.1 Get image url
            response = requests.post(url, data=payload, headers=headers)
            print(response.text)
            if response.status_code == 200:  
                response_data = response.json()   
                print(f"SUCCESS: UPLOAD-IMAGE-URL ${fileName} RESPONSE:\n ${response_data}")    
                upload_url = response_data['upload_url']
                assetID = response_data['assets_id']
                print(f"asset ID for file {fileName}: {assetID}")

                # 1.2 Upload image
                uploadResponse = requests.put(upload_url, data=file.file)
                uploadResponse_data = response.json()

                if uploadResponse.status_code == 200: 
                    print(f"SUCCESS: UPLOAD-IMAGE {fileName} RESPONSE:\n {uploadResponse_data}")
                    return { 'assetID': assetID } 
                else:
                    print(f"ERROR: UPLOAD-IMAGE {fileName}:\n {uploadResponse_data}")
                                

        except Exception as e:
            traceback.print_exc() 
            print(f"ERROR: UPLOAD-IMAGE {fileName}:\n {e}")

    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR: UPLOAD-IMAGE-URL {fileName}:\n {e}")

   
@app.post("/api/trainLora/")
def trainLora(captions: List[str] = Form(...), userModelName: str = Form(...), assetIDs: List[str] = Form(...), instancePrompt: str = Form(...), classPrompt: str = Form(...)):
    try:

        url = "https://api.novita.ai/v3/training/subject"
        payload = json.dumps({
            "name": userModelName,
            "base_model": "realisticVisionV51_v51VAE_94301",
            "width": 512,
            "height": 512,
            "image_dataset_items": [
                {"assets_id": assetID, "caption": captions[index]} 
                for index, assetID in enumerate(assetIDs)
            ],
            "expert_setting": {
                "train_batch_size": 2,
                "learning_rate": 0.0001,
                "max_train_steps": 500,
                "seed": 2023,
                "lr_scheduler": "constant",
                "lr_warmup_steps": None,
                "instance_prompt": instancePrompt,
                "class_prompt": classPrompt,
                "with_prior_preservation": True,
                "prior_loss_weight": None,
                "train_text_encoder": False,
                "lora_r": None,
                "lora_alpha": None,
                "lora_text_encoder_r": None,
                "lora_text_encoder_alpha": None
            },
            "components": [{
                "name": "resize",
                "args": [
                    { "name": "width", "value": "512" },
                    { "name": "height", "value": "512" }
                ]
            }]
        })
        response = requests.post(url, headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loraAPIkey_novita,
            'Content-Type': 'application/json'
        }, data=payload)
        print(response.text)
        response_data = response.json() 
        if response.status_code == 200:  
            task_id = response_data['task_id']
            print(f"SUCCESS: TRAINING-LORA:\n {response_data}")
            return { 'task_id': task_id } 
        else:
            print(f"ERROR: TRAINING-LORA:\n {response_data}")
            return None
        
    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR: TRAINING-LORA:\n {e}")
    
@app.post("/api/getModelStatus/")
def getModelStatus(trainTaskID: str = Form(...)):

    url = f"https://api.novita.ai/v3/training/subject?task_id={trainTaskID}"
    headers = { 'Authorization': 'Bearer ' + loraAPIkey_novita }

    try:
        while True:
            response = requests.get(url, headers = headers)
            print(response.text)
            response_data = response.json()    

            if response.status_code == 200:
                task_status = response_data['task_status']
                if task_status == "SUCCESS":
                    print(f"SUCCESS: TRAINING-LORA:\n {response_data}")
                    model_name = response_data['models'][0]['model_name']
                    return { 'task_status': task_status, 'model_name': model_name }
                elif task_status in ["QUEUING", "TRAINING"]:
                    time.sleep(5)  # Add a delay before checking again
                    continue  # Continue checking while the status is QUEUING or TRAINING
                elif task_status == "FAILED":
                    print(f"Training failed: {response_data}")
                    return { 'task_status': task_status, 'model_name': None }
                else:
                    print(f"Unknown/Cancelled status: {task_status}")
                    return { 'task_status': task_status, 'model_name': None }
            else:
                print(f"ERROR: TRAINING-LORA:\n {response_data}")
                return ""

    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR: TRAINING-STATUS:\n {e}")
    
@app.post("/api/generateImagewithTrainedLora/")
def generateImagewithTrainedLora(modelID: str = Form(...), prompt: str = Form(...)):

    url = "http://api.novita.ai/v2/txt2img"
    payload = json.dumps({
        "model_name": "realisticVisionV51_v51VAE_94301.safetensors",
        "prompt": prompt + f'<lora:{modelID}:1>',
        "negative_prompt": ' ', 
        "batch_size": 1,
        "width": 512,
        "height": 512,
        "sampler_name": "DPM++ 2M Karras",
        "cfg_scale": 7,
        "steps": 30
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + loraAPIkey_novita
    }

    try:
        response = requests.post(url, headers=headers, data=payload)
        # print(response.text)
        response_data = response.json()    

        if response.status_code == 200:
            print(f'SUCCESS: GENERATE-IMAGE-WITH-LORA:\n {response_data}')
            task_id = response_data['data']['task_id']
            return {'task_id': task_id}
        else:
            print(f'ERROR: GENERATE-IMAGE-WITH-LORA:\n {response_data}')
            return {'task_id': None}
        
    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR:GENERATE-IMAGE-WITH-LORA:\n {e}")

@app.post("/api/getImage/")
def getImage(generateTaskID: str = Form(...)):


    url = f"https://api.novita.ai/v2/progress"
    params = {'task_id': generateTaskID }
    headers = { 'Authorization': 'Bearer ' + loraAPIkey_novita }
    payload = {}

    try:
        response = requests.get(url, headers= headers,  params=params)
        # print(response.text)
        response_data = response.json()  

        if response.ok:
            print(f"SUCCESS: GET-IMAGE:\n {response_data}")
            image_url = response_data["imgs"][0]
            return {'image_url: ': image_url}
        else:
            print(f"ERROR: GET-IMAGE:\n {response_data}")
            return {'image_url: ': None}

    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR:GET-IMAGE:\n {e}")   
            