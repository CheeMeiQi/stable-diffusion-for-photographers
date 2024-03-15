from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import StreamingResponse, Response
import fastapi as _fapi
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image
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
async def getAndUploadImage(file: UploadFile = File(...)):

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
            # print(response.text)
            if response.status_code == 200:  
                response_data = response.json()   
                print(f"SUCCESS: UPLOAD-IMAGE-URL ${fileName} RESPONSE:\n ${response_data}")    
                upload_url = response_data['upload_url']
                assetID = response_data['assets_id']
                print(f"asset ID for file {fileName}: {assetID}")

                # 1.2 Upload image
                # image_data = await file.read()
                # image_bytes_io = BytesIO(image_data)
                # image = Image.open(image_bytes_io)
                # image_bytes = image.tobytes()
                uploadResponse = requests.put(upload_url, data=file.file)

                if uploadResponse.status_code == 200: 
                    print(f"SUCCESS: UPLOAD-IMAGE {fileName} RESPONSE:\n {uploadResponse}")
                    return { 'assetID': assetID } 
                else:
                    print(f"ERROR: UPLOAD-IMAGE {fileName}:\n {uploadResponse}")
                                

        except Exception as e:
            traceback.print_exc() 
            print(f"ERROR: UPLOAD-IMAGE {fileName}:\n {e}")

    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR: UPLOAD-IMAGE-URL {fileName}:\n {e}")

   
@app.post("/api/trainLora/")
def trainLora(captions: List[str] = Form(...), userModelName: str = Form(...), assetIDs: str = Form(...), instancePrompt: str = Form(...), classPrompt: str = Form(...)):
    try:
        assetID_list = assetIDs.split(',')

        image_dataset_items = []

        # Iterate over the indices of both arrays
        for index, (caption, assetID) in enumerate(zip(captions, assetID_list)):
            # Create a dictionary for each pair of elements
            item = {
                "assets_id": assetID,
                "caption": caption
            }
            # Append the dictionary to the list
            image_dataset_items.append(item)
        # print("image datatset: ", image_dataset_items)

        url = "https://api.novita.ai/v3/training/subject"
        payload = json.dumps({
            "name": userModelName,
            "base_model": "realisticVisionV51_v51VAE_94301",
            "width": 512,
            "height": 512,
            "image_dataset_items": image_dataset_items,
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
        payload_data = json.loads(payload)
        print("payload: ", payload_data["image_dataset_items"])

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
                    time.sleep(10)  # Add a delay before checking again
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

    # url = "http://api.novita.ai/v2/txt2img"
    # payload = json.dumps({
    #     "model_name": "realisticVisionV51_v51VAE_94301.safetensors",
    #     "prompt": prompt + f'<lora:{modelID}:1>',
    #     "negative_prompt": ' ', 
    #     "batch_size": 1,
    #     "width": 512,
    #     "height": 512,
    #     "sampler_name": "DPM++ 2M Karras",
    #     "cfg_scale": 7,
    #     "steps": 30
    # })
    # headers = {
    #     'Content-Type': 'application/json',
    #     'Authorization': 'Bearer ' + loraAPIkey_novita
    # }

    url = 'https://api.novita.ai/v3/async/txt2img'

    headers = {
        'Authorization': f'Bearer {loraAPIkey_novita}',
        'Content-Type': 'application/json'
    }

    payload = {
        "extra": {
            "response_image_type": "jpeg"
        },
        "request": {
            "prompt": prompt,
            "model_name": "realisticVisionV51_v51VAE_94301.safetensors",
            "negative_prompt": "",
            "width": 512,
            "height": 512,
            "image_num": 2,
            "steps": 20,
            "seed": 123,
            "clip_skip": 1,
            "sampler_name": "Euler a",
            "guidance_scale": 7.5,
            "loras": [
                {
                    "model_name": modelID,
                    "strength": 1
                }
            ]
        }
    }


    try:
        # response = requests.post(url, headers=headers, data=payload)
        # # print(response.text)
        # response_data = response.json()    
        payload_json = json.dumps(payload)
        response = requests.post(url, headers=headers, data=payload_json)
        print(response.text)
        response_data = response.json() 

        if response.status_code == 200:
            print(f'SUCCESS: GENERATE-IMAGE-WITH-LORA:\n {response_data}')
            task_id = response_data['task_id']
            return {'task_id': task_id}
        else:
            print(f'ERROR: GENERATE-IMAGE-WITH-LORA:\n {response_data}')
            return {'task_id': None}
        
    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR:GENERATE-IMAGE-WITH-LORA:\n {e}")

@app.post("/api/getImage/")
def getImage(generateTaskID: str = Form(...)):

    # print("generate task id: ", generateTaskID)
    # url = "https://api.novita.ai/v2/progress"
    # params = {'task_id': generateTaskID }
    # print("params: ", params)
    # headers = { 'Authorization': 'Bearer ' + loraAPIkey_novita }

    
    url = "http://api.novita.ai/v3/async/task-result"
    params = {'task_id': generateTaskID}
    headers = {
    'Authorization': 'Bearer ' + loraAPIkey_novita
    }

    try:
        while True:
            # response = requests.get(url, headers= headers,  params=params)
            # print(response.text)
            # response_data = response.json() 

            response = requests.get(url, headers=headers, params=params)
            print(response.text) 
            response_data = response.json() 

            if response.ok:
                task_status = response_data["task"]["status"]
                if  task_status == "TASK_STATUS_SUCCEED":
                    print(f"SUCCESS: GET-IMAGE:\n {response_data}")
                    image_url = response_data["images"][0]["image_url"]
                    return {'image_url': image_url}
                elif task_status == "TASK_STATUS_QUEUED":
                    time.sleep(5)  # Add a delay before checking again
                    continue  # Continue checking while the status is QUEUING or TRAINING
                elif task_status == "TASK_STATUS_FAILED":
                    print(f"GET IMAGE failed: {response_data}")
                    return {'image_url': "image_url"}
                else:
                    print(f"Unknown/Cancelled status: {task_status}")
                    return {'image_url': "image_url"}

                # image_url = response_data["images"][0]["image_url"]
                # if image_url is None:
                #     return {'image_url: ': "image_url"}
                # else:
                #     return {'image_url: ': image_url}
            else:
                print(f"ERROR: GET-IMAGE:\n {response_data}")
                return {'image_url: ': "image_url"}

    except Exception as e:
        traceback.print_exc() 
        print(f"ERROR:GET-IMAGE:\n {e}")   
            