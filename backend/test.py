import requests
from auth_token import loraAPIkey_novita
import json

url = 'https://api.novita.ai/v3/async/txt2img'

# Set the authorization token (replace '{{your Key in Get Started: https://novita.ai/get-started/Account_account_and_key.html}}' with your actual API key)
authorization_token = 'YOUR_API_KEY_HERE'

# Set the headers
headers = {
    'Authorization': f'Bearer {loraAPIkey_novita}',
    'Content-Type': 'application/json'
}

# Set the request payload
payload = {
    "extra": {
        "response_image_type": "jpeg"
    },
    "request": {
        "prompt": "marina bay sands singapore",
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
                "model_name": "model_1710468992_9787478987",
                "strength": 1
            }
        ]
    }
}

# Convert the payload to JSON format
payload_json = json.dumps(payload)

# Make the POST request
response = requests.post(url, headers=headers, data=payload_json)

# Print the response
print(response.text)


# url = "http://api.novita.ai/v3/async/task-result"
# params = {'task_id': 'd8f326ef-9b2d-4e7d-9df7-d77f9eec6e30'}
# headers = {
#   'Authorization': 'Bearer ' + loraAPIkey_novita
# }

# response = requests.get(url, headers=headers, params=params)

# print(response.text)
