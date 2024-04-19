import requests
import json
from auth_token import loraAPIkey 

url = "https://stablediffusionapi.com/api/v3/lora_fine_tune"

payload = json.dumps({
    "key": loraAPIkey,
    "instance_prompt": "photo of sgmbs0 mbs",
    "class_prompt": "photo of mbs",
    "base_model_type": "sdxl",
    "negative_prompt": "unrealistic, bad proportion, not accurate, text, error, cropped, worst quality, low quality, watermark, blurry, not real", 
    "images": [
        "https://drive.google.com/file/d/1BWYyViS1F564Cpg1mRhCT7E0nlsHYuZ_/view",
        "https://drive.google.com/file/d/1DHAhcrZ_S00mT8W5WrChJKZz8PlHqaWt/view",
        "https://drive.google.com/file/d/113sR2i-71gESkA5IlTkS-5GjqI5Q4K7Z/view",
        "https://drive.google.com/file/d/1pViwzSrkWMVAf7iTPr8NRGNzBkhbos8U/view",
        "https://drive.google.com/file/d/1ottWDOdZLWLGQ8csEZDDWFn1PQiUt6vr/view",
        "https://drive.google.com/file/d/1QH4S7-2hmtxV0yqKjm6ER2nB2cSLKdY_/view",
        "https://drive.google.com/file/d/10yaTKpf0fc5v7_MS6c6K8OaxqaI010m5/view",
        "https://drive.google.com/file/d/1-H8T1LWWAxlPZMAg3DJMbm2eADj1oM64/view",
        "https://drive.google.com/file/d/1a_1PdtlmOOUqmc1Sl-2YUuwqAkI2rtuQ/view"
    ],
    "seed": "0",
    "training_type": "",
    "max_train_steps": "2",
    "lora_type": "lora",
    "webhook": ""
})

headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)