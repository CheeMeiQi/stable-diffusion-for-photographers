export const loraAPI = {
    
    // 1. Get image upload URL and upload the images (10x)
    getAndUploadImage: (folderPath, uploadedImages) => {

        console.log(`File Path: ${folderPath}`);
        for (let i=0; i<10;i++){
            // const fileName = uploadedImages[i].file.name;
            // const fileExtension = fileName.split('.').pop();
            // console.log(`index: ${i}, ext: ${fileExtension}`);
            console.log(uploadedImages[i].file);
        }
        const assetIDs = ["1", "2"];
        return assetIDs;
        // const assetIDs = [];
        // for (let i = 1; i <= 10; i++) {
                // const fileName = uploadedImages[i].file.name; 
                // const fileExtension = fileName.split('.').pop();
        //     // 1.1. Get image upload URL
        //     const url = "https://api.novita.ai/v3/assets/training_dataset";
        //     const payload = { "file_extension": `${fileExtension}` }; //must change
        //     const headers = {
        //         'Authorization': 'Bearer ' + loraAPIkey_novita,
        //         'Content-Type': 'application/json'
        //     };
        //     const response = requests.post(url, { headers, data: payload });
        //     console.log(Fore.GREEN + `SUCCESS: UPLOAD-IMAGE-URL ${i} RESPONSE:\n ${response.text}`);
        //     if (response.status_code === 200) {
        //         const image_url_response = response.json();
        //         const upload_url = image_url_response.upload_url;
        //         assetIDs.push(image_url_response.assets_id);
        //     } else {
        //         console.log(`ERROR: UPLOAD-IMAGE-URL ${i}:\n ${response.text}`);
        //     }

        //     // 1.2. Upload images
        //     //const filePath = folderPath + `${i}.${imageFormat}`;
        //     //const file = { uri: filePath, type: 'image/jpeg', name: `image-${i}.${imageFormat}` };
        //     const uploadResponse = requests.put(upload_url, { headers, data: uploadedImages[i].file }); // change file

        //     if (uploadResponse.ok) {
        //         console.log(`SUCCESS: UPLOAD-IMAGE ${i} RESPONSE:\n ${uploadResponse.text}`);
        //     } else {
        //         console.log(`ERROR: UPLOAD-IMAGE ${i}:\n ${uploadResponse.text}`);
        //     }
        // }
        // return assetIDs;
    },

    // 2.1. Start training task and configure parameters
    trainLora: (userModelName, assetIDs, uploadedImages, instancePrompt, classPrompt) => {

        console.log(`userModelName: ${userModelName}`);
        console.log(`assetIDs: ${assetIDs}`);
        uploadedImages.forEach(image => {
            console.log(image.caption); 
        });
        console.log(`instancePrompt: ${instancePrompt}`);
        console.log(`classPrompt: ${classPrompt}`);
        const task_id = "train task id";
        return task_id;

        // const url = "https://api.novita.ai/v3/training/subject";
        // const payload = {
        //     "name": userModelName,
        //     "base_model": "realisticVisionV51_v51VAE_94301",
        //     "width": 512,
        //     "height": 512,
        //     "image_dataset_items": assetIDs.map((assetID, index) => ({
        //         "assets_id": assetID,
        //         "caption": uploadedImages[index].caption
        //     })),
        //     "expert_setting": {
        //         "train_batch_size": 2,
        //         "learning_rate": 0.0001,
        //         "max_train_steps": 500,
        //         "seed": 2023,
        //         "lr_scheduler": "constant",
        //         "lr_warmup_steps": null,
        //         "instance_prompt": instancePrompt,
        //         "class_prompt": classPrompt,
        //         "with_prior_preservation": true,
        //         "prior_loss_weight": null,
        //         "train_text_encoder": false,
        //         "lora_r": null,
        //         "lora_alpha": null,
        //         "lora_text_encoder_r": null,
        //         "lora_text_encoder_alpha": null
        //     },
        //     "components": [{
        //         "name": "resize",
        //         "args": [
        //             { "name": "width", "value": "512" },
        //             { "name": "height", "value": "512" }
        //         ]
        //     }]
        // };
        // const headers = {
        //     'Accept': 'application/json',
        //     'Authorization': 'Bearer ' + loraAPIkey_novita,
        //     'Content-Type': 'application/json'
        // };
        // const response = requests.post(url, { headers, data: payload });
        // if (response.status_code === 200) {
        //     const training_response = response.json();
        //     const task_id = training_response.task_id;
        //     console.log(`SUCCESS: TRAINING-LORA:\n ${response.text}`);
        //     return task_id;
        // } else {
        //     console.log(`ERROR: UPLOAD-IMAGE-URL:\n ${response.text}`);
        //     return null;
        // }
    },

    // 3.1. Get model training and deployment status
    getModelStatus: (trainTaskID, counter) => {
        if (trainTaskID == null) {
            console.log("null trainTaskID");
        } else if (trainTaskID == ""){
            console.log("empty trainTaskID");
        }
        else {
            console.log(`train task id: ${trainTaskID}`);
        }
        
        if (counter < 2){
            return "";
        }
        else {
            const model_name = "jsnfjg";
            return model_name;
        };     
        // const url = `https://api.novita.ai/v3/training/subject?task_id=${taskID}`;
        // const headers = { 'Authorization': 'Bearer ' + loraAPIkey_novita };
        // const response = requests.get(url, { headers });
        // if (response.status_code === 200) {
        //     const modelStatus_response = response.json();
        //     const task_status = modelStatus_response.task_status;
        //     if (task_status === "SUCCESS") {
        //         console.log(`SUCCESS: TRAINING-LORA:\n ${response.text}`);
        //         const model_name = modelStatus_response.models.model_name;
        //         return model_name;
        //     } else {
        //         console.log(Fore.RED + `TRAINING-STATUS:\n ${task_status}`);
        //         return "";
        //     }
        // } else {
        //     console.log(`ERROR: TRAINING-LORA:\n ${response.text}`);
        //     return "";
        // }
    },


    // 4.2. Start using the trained model
    generateImagewithTrainedLora: (modelID, prompt) => {

        console.log(`model ID: ${modelID}`);
        console.log(`prompt: ${prompt}`);
        const task_id = "generate task id"
        return task_id

        // const url = "http://api.novita.ai/v2/txt2img";
        // const payload = {
        //     "model_name": "realisticVisionV51_v51VAE_94301.safetensors",
        //     "prompt": prompt + `<lora:${modelID}:1>`,
        //     "negative_prompt": ' ', // no negative prompt
        //     "batch_size": 1,
        //     "width": 512,
        //     "height": 512,
        //     "sampler_name": "DPM++ 2M Karras",
        //     "cfg_scale": 7,
        //     "steps": 30
        // };
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + loraAPIkey_novita
        // };
        // const response = requests.post(url, { headers, data: json.dumps(payload) });
        // console.log(response.text);
        // return response.task_id;
    },

    // 4.3. Get image
    getImage: (generateTaskID) => {
        console.log(`generateTaskID: ${generateTaskID}`);
        const image_url = "https://blahblah";
        return image_url;

        // const url = "http://api.novita.ai/v2/progress";
        // const params = { 'task_id': '5795eb82-30e3-45fe-b379-7dd7897a2840' };
        // const headers = { 'Authorization': 'Bearer ' + loraAPIkey_novita };
        // const response = requests.get(url, { headers, params });
        // console.log(response.text);
        // return response.image_url;
    },

    // 4.4. Open image
    openImage: (image_url) => {
        console.log(`image url: ${image_url}`)
        // const response = requests.get(image_url);
        // const image = Image.open(response.content);
        // image.show();
        // return image;
    },

}
