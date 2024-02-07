from auth_token import loraAPIkey_novita
import requests
import json
from PIL import Image
from io import BytesIO
from datetime import datetime
from colorama import init, Fore, Back, Style

# 1. Get image upload URL and upload the images (10x)
def getAndUploadImage(folderPath, imageFormat):

    assetIDs = []
    for i in range(1, 11, 1):
        # 1.1. Get image upoad URL
        url = "https://api.novita.ai/v3/assets/training_dataset"
        payload = {"file_extension": f"{imageFormat}"}
        headers = {
        'Authorization': 'Bearer ' + loraAPIkey_novita,
        'Content-Type': 'application/json'
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        print(Fore.GREEN + f"SUCCESS: UPLOAD-IMAGE-URL {i} RESPONSE:\n " + response.text)
        if response.status_code == 200:
            image_url_response = response.json()
            upload_url = image_url_response["upload_url"]
            assetIDs.append(image_url_response["assets_id"])
        else:
            print(Fore.RED + f"ERROR: UPLOAD-IMAGE-URL {i}:\n" + response.text)

        # 1.2. Upload images
        # filePath = r"C:\Users\Mei Qi\Desktop\SampleMBSImages\10.jpg"
        filePath = folderPath + f"{i}.{imageFormat}"
        # Open the file in binary mode and send a PUT request with the file content
        with open(filePath, 'rb') as file:
            response = requests.put(upload_url, data=file)

        if response.ok:
            print(Fore.GREEN + f"SUCCESS: UPLOAD-IMAGE {i} RESPONSE:\n ", response.text)
        else:
            print(Fore.RED + f"ERROR: UPLOAD-IMAGE {i}:\n ", response.text)

        return assetIDs


# 2.1. Start training task and configure parameters
def trainLora(userModelName, assestIDs, imageCaptions, instancePrompt, classPrompt):

    url = "https://api.novita.ai/v3/training/subject"

    payload = json.dumps({
    "name": userModelName,
    #TODO: change to see which model is better
    "base_model": "realisticVisionV51_v51VAE_94301", 
    "width": 512,
    "height": 512,
    "image_dataset_items": [
            {
                "assets_id": assestIDs[0],
                "caption": imageCaptions[0]

            },
            {
                "assets_id": assestIDs[1],
                "caption": imageCaptions[1]
            },
            {
                "assets_id": assestIDs[2],
                "caption": imageCaptions[2]
            },
            {
                "assets_id": assestIDs[3],
                "caption": imageCaptions[3]
            },
            {
                "assets_id": assestIDs[4],
                "caption": imageCaptions[4]
            },
            {
                "assets_id": assestIDs[5],
                "caption": imageCaptions[5]
            },
            {
                "assets_id": assestIDs[6],
                "caption": imageCaptions[6]
            },
            {
                "assets_id": assestIDs[7],
                "caption": imageCaptions[7]
            },
            {
                "assets_id": assestIDs[8],
                "caption": imageCaptions[8]
            },
            {
                "assets_id": assestIDs[9],
                "caption": imageCaptions[9]
            },
        ],
    "expert_setting": {
        "train_batch_size": 2,
        "learning_rate": 0.0001,
        "max_train_steps": 500,
        "seed": 2023,
        "lr_scheduler": "constant",
        "lr_warmup_steps": None,
        # "instance_prompt": "beautiful skyline of Marina Bay Sands at night in Singapore, photorealistic, sharp-focus, highly detailed, 8K",
        "instance_prompt": instancePrompt,
        # TODO: check if can put any other class prompt with style training
        "class_prompt": "person",
        "with_prior_preservation": True,
        "prior_loss_weight": None,
        "train_text_encoder": False,
        "lora_r": None,
        "lora_alpha": None,
        "lora_text_encoder_r": None,
        "lora_text_encoder_alpha": None
    },
    "components": [
        {
        "name": "resize",
        "args": [
            {
            "name": "width",
            "value": "512"
            },
            {
            "name": "height",
            "value": "512"
            }
        ]
        }
    ]
    })
    headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + loraAPIkey_novita,
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    if response.status_code == 200:
            training_response = response.json()
            task_id = training_response["task_id"]
            print(Fore.GREEN + f"SUCCESS: TRAINING-LORA:\n" + response.text)
    else:
        print(Fore.RED + f"ERROR: UPLOAD-IMAGE-URL:\n" + response.text)

    return task_id


# 3.1. Get model training and deployment status
def  getModelStatus(taskID):

    url = f"https://api.novita.ai/v3/training/subject?task_id={taskID}"

    payload = {}
    headers = {
      'Authorization': 'Bearer ' + loraAPIkey_novita
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    if response.status_code == 200:
            modelStatus_response = response.json()
            task_status = modelStatus_response["task_status"]
            if task_status == "SUCCESS":
                print(Fore.GREEN + f"SUCCESS: TRAINING-LORA:\n" + response.text)
                model_name = modelStatus_response["models"]["model_name"]
            else:
                print(Fore.RED + f"TRAINING-STATUS:\n" + task_status)         
    else:
        print(Fore.RED + f"ERROR: TRAINING-LORA:\n" + response.text)

    return model_name


#4.1 Get lora name

# url = "https://api.novita.ai/v3/model"

# params = {
#     'filter.visibility': "private",
#     'filter.source': "training",
#     'filter.types': ['lora']

# }
# headers = {
#     'Authorization': 'Bearer ' + loraAPIkey_novita
# }

# response = requests.request("GET", url, headers=headers, params=params)

# print(response.text)


# dictionary to match userModelName (i.e. task_name) to model_name

# 4.2. Start using the trained model
def generateImagewithTrainedLora(userModelName, prompt, negativePrompt):

    # seach model_name in dictionary
    url = "http://api.novita.ai/v2/txt2img"

    payload = {
      "model_name": "realisticVisionV51_v51VAE_94301.safetensors",
      "prompt": prompt + f"<lora:{model_name}:1>",
      "negative_prompt": negativePrompt,
      "batch_size": 1,
      "width": 512,
      "height": 512,
      "sampler_name": "DPM++ 2M Karras",
      "cfg_scale": 7,
      "steps": 30
    }

    headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + loraAPIkey_novita
    }

    response = requests.post(url, headers=headers, data=json.dumps(payload))

    print(response.text)

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
