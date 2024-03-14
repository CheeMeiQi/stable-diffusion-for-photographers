from fastapi import FastAPI, File, UploadFile
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
async def getAndUploadImage(files: List[UploadFile] = File(...)):

    try:
        for file in files:
            contents = await file.read()
            print(contents)
        # assetIDs = []
        # for i, (key, uploadedImage) in enumerate(uploadedImages.items(), start=1):
        #     print(i, key, uploadedImage)
        #     print("uploadedImage backend: ", uploadedImage['file'].values())
    #         fileName = key['file']['name']
    #         fileExtension = fileName.split('.')[-1]

    #         url = "https://api.novita.ai/v3/assets/training_dataset"
    #         headers = {
    #             'Authorization': 'Bearer' + loraAPIkey_novita,
    #             'Content-Type': 'application/json'
    #         }
    #         payload = { 'file_extension': fileExtension }

    #         try:
    #             # 1.1 Get image url
    #             response = await requests.post(url, json=payload, headers=headers)
    #             response_data = response.json()

    #             responseText = await response.text()
    #             print(f"SUCCESS: UPLOAD-IMAGE-URL ${i} RESPONSE:\n ${responseText}")
                
    #             if response.ok:         
    #                 upload_url = response_data['upload_url']
    #                 assetID = response_data['assets_id']
    #                 assetIDs.append(assetID)

    #                 # 1.2 Upload image
    #                 uploadResponse = requests.put(upload_url, data=uploadedImage['file'])
    #                 uploadResponseText = await uploadResponse.text()

    #                 if uploadResponse.ok: 
    #                     print(f"SUCCESS: UPLOAD-IMAGE {i} RESPONSE:\n {uploadResponseText}")
    #                 else:
    #                     print(f"ERROR: UPLOAD-IMAGE {i}:\n {uploadResponseText}")
                                    

    #         except Exception as e:
    #             print(f"ERROR: UPLOAD-IMAGE {i}:\n {e}")

    # except Exception as e:
    #     print(f"ERROR: UPLOAD-IMAGE-URL {i}:\n {e}")

    # return { 'assetIDs': assetIDs } 
    except Exception as e:
        raise e
    return ""
    