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

# filepath = r"C:\Users\Mei Qi\Desktop\SampleMBSImages\10.jpg"
# upload_url = ""

# # Open the file in binary mode and send a PUT request with the file content
# with open(filepath, 'rb') as file:
#     response = requests.put(upload_url, data=file)

# # Check the response status
# if response.ok:
#     print("File uploaded successfully: ", response.text)
# else:
#     print("Error occurred: ", response.text)


# 2.1. Start training task and configure parameters


# url = "https://api.novita.ai/v3/training/subject"

# payload = json.dumps({
#   "name": "MBS_01",
#   "base_model": "realisticVisionV51_v51VAE_94301",
#   "width": 512,
#   "height": 512,
#   "image_dataset_items": [
#         {
#             "assets_id": "40388e4686d4ea00b1359bc6618a4ea2",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes in front of it"

#         },
#         {
#             "assets_id": "651bbe00a3fcb8793302e40b5caba4f4",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes and Art Science Museum on the right"
#         },
#         {
#             "assets_id": "cc1ff61753c91f735bc7610d920d71f3",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes and Art Science Museum in front of MBS"
#         },
#         {
#             "assets_id": "82c9fdacbb457e7515ed0e25454f99c7",
#             "caption": "Marina Bay Sands (MBS) Singapore during the day"
#         },
#         {
#             "assets_id": "d700b80dd31d86460bd81807e10680a9",
#             "caption": "Marina Bay Sands (MBS) Singapore at night with Shoppes in front of it and Art Science Museum on the left "
#         },
#         {
#             "assets_id": "ee36ba0d045b1e9b79c506396baa8f42",
#             "caption": "Marina Bay Sands (MBS) Singapore during evening wiht Shoppes in front of it"
#         },
#         {
#             "assets_id": "902cac2e72a33b98b9bf9d6b286311f2",
#             "caption": "MBS Singapore during evening with Shoppes and Art Science Museum"
#         },
#         {
#             "assets_id": "4aff63dd7ce1e1970a64bbe7e0017cc5",
#             "caption": "MBS at night with Helix Bridge on the left and Shoppes in front of MBS"
#         },
#         {
#             "assets_id": "6ec6d5663c16c88cc17757f76a6ebfc5",
#             "caption": "MBS during the day wit Shoppes in front of it"
#         },
#         {
#             "assets_id": "acb16f58b232e94b15b439da5bd440b8",
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

# url = "https://api.novita.ai/v3/training/subject?task_id=4a086be5-0316-430d-953d-d92a3cfb843f"

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
#   "prompt": "beautiful skyline of Marina Bay Sands with only 3 towers at night <lora:model_1707235694_3ED9146D7A:1>",
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

# 4.3. Get image

# url = "http://api.novita.ai/v2/progress"
# params = {'task_id': '5795eb82-30e3-45fe-b379-7dd7897a2840'}
# headers = {
#   'Authorization': 'Bearer ' + loraAPIkey_novita
# }

# response = requests.get(url, headers=headers, params=params)

# print(response.text)

# 4.4. Open image

# Fetch the image from the URL
# url = ""
# response = requests.get(url)
# image = Image.open(BytesIO(response.content))

# # Display and save the image
# image.show()
# current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
# save_path = f"./images/mbs_{current_datetime}.png"
# image.save(save_path)
