from auth_token import loraAPIkey_novita
import requests
import json
from PIL import Image
from io import BytesIO
from datetime import datetime

# 1.1. Get image upoad URL

# url = "https://api.novita.ai/v3/assets/training_dataset"

# payload = "{\"file_extension\": \"jpeg\"}"

# headers = {
#   'Authorization': 'Bearer ' + loraAPIkey_novita,
#   'Content-Type': 'application/json'
# }

# response = requests.request("POST", url, headers=headers, data=payload)

# print(response.text)

# 1.2. Upload images

filepath = r"C:\Users\Mei Qi\Desktop\SampleMBSImages\10.jpeg"
upload_url = "https://faas-training-dataset.s3.ap-southeast-1.amazonaws.com/prod/a5315c674586769acc75d526286afead.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASVPYCN6LRCW3SOUV%2F20240315%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240315T021332Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&x-id=PutObject&X-Amz-Signature=08fe3492b55f32d3029ddf5a2966cec7631408821490d2e073e5c3490b372a6f"

# Open the file in binary mode and send a PUT request with the file content
with open(filepath, 'rb') as file:
    response = requests.put(upload_url, data=file)

    # Check the response status
    if response.ok:
        print("File uploaded successfully: ", response.text)
    else:
        print("Error occurred: ", response.text)


# 2.1. Start training task and configure parameters


# url = "https://api.novita.ai/v3/training/subject"

# payload = json.dumps({
#   "name": "MBS_02",
#   "base_model": "realisticVisionV51_v51VAE_94301",
#   "width": 512,
#   "height": 512,
#   "image_dataset_items": [
#         {
#             "assets_id": "a162ceb906ca22a0e87d5e436a88cbf4",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes in front of it"

#         },
#         {
#             "assets_id": "c66f298fc1e80b83bf58ce627ab0ea3f",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes and Art Science Museum on the right"
#         },
#         {
#             "assets_id": "775a535e03709a123dc3c97499f03a10",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes and Art Science Museum in front of MBS"
#         },
#         {
#             "assets_id": "7d0968a3eed04c7eff74fb01c41a2bdc",
#             "caption": "Marina Bay Sands (MBS) Singapore during the day"
#         },
#         {
#             "assets_id": "1c4524cf2bd1f845ebc2103a44645788",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes in front of it and Art Science Museum on the left "
#         },
#         {
#             "assets_id": "7c5997b35f12e2ac2e1bbfdbcc1b7580",
#             "caption": "Marina Bay Sands (MBS) Singapore during evening wiht Shoppes in front of it"
#         },
#         {
#             "assets_id": "f84449b64bd65f406411cbf4293856a3",
#             "caption": "MBS Singapore during evening with Shoppes and Art Science Museum"
#         },
#         {
#             "assets_id": "a48466e552525afe843f3b0dcea8dc86",
#             "caption": "MBS at night with Helix Bridge on the left and Shoppes in front of MBS"
#         },
#         {
#             "assets_id": "d21141a4606b0d5c74ca1070ba67627c",
#             "caption": "MBS during the day wit Shoppes in front of it"
#         },
#         {
#             "assets_id": "a5315c674586769acc75d526286afead",
#             "caption": "MBS Singapore during the dat with Shoppes and Art Science Museum in front of it"
#         }
#     ],
#   "expert_setting": {
#     "train_batch_size": 2,
#     "learning_rate": 0.0001,
#     "max_train_steps": 500,
#     "seed": 2023,
#     "lr_scheduler": "constant",
#     "lr_warmup_steps": None,
#     "instance_prompt": "beautiful skyline of Marina Bay Sands at night in Singapore, photorealistic, sharp-focus, highly detailed, 8K",
#     "class_prompt": "person",
#     "with_prior_preservation": True,
#     "prior_loss_weight": None,
#     "train_text_encoder": False,
#     "lora_r": None,
#     "lora_alpha": None,
#     "lora_text_encoder_r": None,
#     "lora_text_encoder_alpha": None
#   },
#   "components": [
#     {
#       "name": "resize",
#       "args": [
#         {
#           "name": "width",
#           "value": "512"
#         },
#         {
#           "name": "height",
#           "value": "512"
#         }
#       ]
#     }
#   ]
# })
# headers = {
#   'Accept': 'application/json',
#   'Authorization': 'Bearer ' + loraAPIkey_novita,
#   'Content-Type': 'application/json'
# }

# response = requests.request("POST", url, headers=headers, data=payload)

# print(response.text)


# 3.1. Get model training and deployment status

# url = "https://api.novita.ai/v3/training/subject?task_id=b04c6c56-e4a0-4fe7-98ca-220ffa6de070"

# payload = {}
# headers = {
#   'Authorization': 'Bearer ' + loraAPIkey_novita
# }

# response = requests.request("GET", url, headers=headers, data=payload)

# print(response.text)

# 4.1 Get lora name

# url = "https://api.novita.ai/v3/model"

# params = {
#     'filter.visibility': "private",
#     'filter.source': "training",
#     'filter.types': ['lora']

# }
# headers = {
#   'Authorization': 'Bearer ' + loraAPIkey_novita
# }

# response = requests.request("GET", url, headers=headers, params=params)

# print(response.text)

# 4.2. Start using the trained model

# url = "http://api.novita.ai/v2/txt2img"

# payload = {
#   "model_name": "realisticVisionV51_v51VAE_94301.safetensors",
#   "prompt": "beautiful skyline of Marina Bay Sands with only 3 towers at night <lora:model_1710468992_9787478987:1>",
#   "negative_prompt": "more than 3 towers, fewer than 3 towers, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, out of focus",
#   "batch_size": 1,
#   "width": 512,
#   "height": 512,
#   "sampler_name": "DPM++ 2M Karras",
#   "cfg_scale": 7,
#   "steps": 30
# }

# headers = {
#   'Content-Type': 'application/json',
#   'Authorization': 'Bearer ' + loraAPIkey_novita
# }

# response = requests.post(url, headers=headers, data=json.dumps(payload))

# print(response.text)

import requests
import json

url = "https://api.novita.ai/v3/async/txt2img"

payload = json.dumps({
  "extra": {
    "response_image_type": "jpeg",
    "enable_nsfw_detection": True,
    "nsfw_detection_level": 0,
    "custom_storage": {
      "aws_s3": {
        "region": "us-east-2",
        "bucket": "test_bucket",
        "path": "/"
      }
    },
    "enterprise_plan": {
      "enabled": False
    }
  },
  "request": {
    "model_name": "anyhentai_20_31826.safetensors",
    "prompt": "nsfw, 1girl, (solo:1.1), small breasts, topless, nipples, thongs, thigh, slicked back short hair, half body in pool, outdoor, pool side, very sexy, wet body, modern villa, southern france, soft light, realistic, intricate details, (light freckles:0.5), lightly tanned, professional photography, depth of field, amazing eyes, (smooth hands:1.1), photoshoot, detailed background, professional model, ultra 4k, photorealist, lace panties",
    "negative_prompt": "(badhandv4:1.2),(worst quality:2),(low quality:2),(normal quality:2),lowres,bad anatomy,bad hands,((monochrome)),((grayscale)) watermark,moles, easynegative ng_deepnegative_v1_75t, (oversized head:2), (big head:2), (deformed face:1.5),( blurry face:2), bad eyes, irregular eyes, asymmetric eyes, ugly, teeth, (navel:0.9), artefact, jpg artefact, blurry face, blurry, blurred, pixelated, bad eyes, crossed eyes, blurry eyes, nipple",
    "sd_vae": "",
    "loras": [
      {
        "model_name": "",
        "strength": None
      }
    ],
    "embeddings": [
      {
        "model_name": ""
      }
    ],
    "hires_fix": {
      "target_width": None,
      "target_height": None,
      "strength": None,
      "upscaler": "RealESRGAN_x4plus_anime_6B"
    },
    "refiner": {
      "switch_at": None
    },
    "width": 512,
    "height": 512,
    "image_num": 1,
    "steps": 20,
    "seed": 123,
    "clip_skip": 1,
    "guidance_scale": 7.5,
    "sampler_name": "Euler a"
  }
})
headers = {
  'Authorization': 'Bearer {{key}}',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)


# 4.3. Get image

# url = "http://api.novita.ai/v2/progress"
# params = {"task_id": "0444cbea-0251-43ca-ab17-8c810d3f418c"}
# headers = {"Authorization": "Bearer " + loraAPIkey_novita}

# response = requests.get(url, headers=headers, params=params)

# print(response.text)

# 4.1. Start using the trained model
# 4.4. Open image

# Fetch the image from the URL
# url = "https://faas-output-image.s3.ap-southeast-1.amazonaws.com/v2_prod/85ffdc6d-0d4b-41a8-96e4-83d8673bd95b-0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASVPYCN6LRCW3SOUV%2F20240315%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240315T025141Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=dc930b7c0a1db3ccf461f01c5e660229b76d716ec929f99182211340805a2f8e"
# response = requests.get(url)
# image = Image.open(BytesIO(response.content))

# # Display and save the image
# image.show()
# current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
# save_path = f"./backend/images/mbs_{current_datetime}.png"
# image.save(save_path)
