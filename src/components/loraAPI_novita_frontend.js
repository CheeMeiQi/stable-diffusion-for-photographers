import { loraAPIkey_novita } from  "./auth_token.js";

export const loraAPI = {
    
    // 1.1. Get image upload URL and upload the images (10x)
    getAndUploadImage: async (uploadedImages) => {

        // console.log(`File Path: ${folderPath}`);
        // for (let i=0; i<10;i++){
        //     // const fileName = uploadedImages[i].file.name;
        //     // const fileExtension = fileName.split('.').pop();
        //     // console.log(`index: ${i}, ext: ${fileExtension}`);
        //     console.log(uploadedImages[i].file);
        // }
        // const assetIDs = ["1", "2"];
        // return assetIDs;

        const assetIDs = [];
        for (let i = 1; i <= 10; i++) {
            const fileName = uploadedImages[i].file.name; 
            const fileExtension = fileName.split('.').pop();
            console.log(`file name: ${fileName}, ext: ${fileExtension}`);
            // 1.1. Get image upload URL
            const url = "https://api.novita.ai/v3/assets/training_dataset";
            const payload = { "file_extension": `${fileExtension}` };
            const headers = {
                'Authorization': 'Bearer ' + loraAPIkey_novita,
                'Content-Type': 'application/json'
            };

            try{
                const response = await fetch(url, { method: 'POST', headers: headers, body:  JSON.stringify(payload) });

                if (response.ok) {
                    const responseText = await response.text();
                    const responseJson = JSON.parse(responseText);
                    console.log(`SUCCESS: UPLOAD-IMAGE-URL ${i} RESPONSE:\n ${responseText}`);
                    const upload_url = responseJson.upload_url;
                    console.log(`upload_url: ${upload_url}`)
                    assetIDs.push(responseJson.assets_id);
                    console.log(`assets_id: ${responseJson.assets_id}`)

                     // 1.2. Upload images
                    const uploadedImage = uploadedImages[i].file;
                    console.log(`file: ${uploadedImage}`);
                    const uploadResponse = await fetch(upload_url, { method: 'PUT', headers, data: uploadedImages[i].file });

                    const uploadResponseText = await uploadResponse.text();
                    if (uploadResponse.ok) { 
                        console.log(`SUCCESS: UPLOAD-IMAGE ${i} RESPONSE:\n ${uploadResponseText}`);
                    } else {
                        console.log(`ERROR: UPLOAD-IMAGE ${i}:\n ${uploadResponseText}`);
                    }
                } 
                // else {
                //     console.log(`ERROR: UPLOAD-IMAGE-URL ${i}:\n ${await response.text()}`);
                // }   
            } catch (error){
                console.log(`ERROR: UPLOAD-IMAGE-URL ${i}:\n ${error}`);
            }    
        }
        return assetIDs;
    },

    // 2.1. Start training task and configure parameters
    trainLora: async (userModelName, assetIDs, uploadedImages, instancePrompt, classPrompt) => {

        // console.log(`userModelName: ${userModelName}`);
        // console.log(`assetIDs: ${assetIDs}`);
        // uploadedImages.forEach(image => {
        //     console.log(image.caption); 
        // });
        // console.log(`instancePrompt: ${instancePrompt}`);
        // console.log(`classPrompt: ${classPrompt}`);
        // const task_id = "train task id";
        // return task_id;

        const url = "https://api.novita.ai/v3/training/subject";
        const payload = {
            "name": userModelName,
            "base_model": "realisticVisionV51_v51VAE_94301",
            "width": 512,
            "height": 512,
            "image_dataset_items": assetIDs.map((assetID, index) => ({
                "assets_id": assetID,
                "caption": uploadedImages[index].caption
            })),
            "expert_setting": {
                "train_batch_size": 2,
                "learning_rate": 0.0001,
                "max_train_steps": 500,
                "seed": 2023,
                "lr_scheduler": "constant",
                "lr_warmup_steps": null,
                "instance_prompt": instancePrompt,
                "class_prompt": classPrompt,
                "with_prior_preservation": true,
                "prior_loss_weight": null,
                "train_text_encoder": false,
                "lora_r": null,
                "lora_alpha": null,
                "lora_text_encoder_r": null,
                "lora_text_encoder_alpha": null
            },
            "components": [{
                "name": "resize",
                "args": [
                    { "name": "width", "value": "512" },
                    { "name": "height", "value": "512" }
                ]
            }]
        };
        try {
            const response = await fetch (url, { method: 'POST', headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + loraAPIkey_novita,
                'Content-Type': 'application/json'
            }, body: JSON.stringify(payload) });

            if (response.status_code === 200) {
                const training_response = await response.json();
                const task_id = training_response.task_id;
                console.log(`SUCCESS: TRAINING-LORA:\n ${JSON.stringify(training_response)}`);
                return task_id;
            } else {
                console.log(`ERROR: UPLOAD-IMAGE-URL:\n ${response.text()}`);
                return null;
            }
        } catch (error) {
            console.error("Error in trainLora:", error);
            return null;
        }
        
    },

    // 3.1. Get model training and deployment status
    getModelStatus: async (trainTaskID) => {
        // if (trainTaskID == null) {
        //     console.log("null trainTaskID");
        // } else if (trainTaskID == ""){
        //     console.log("empty trainTaskID");
        // }
        // else {
        //     console.log(`train task id: ${trainTaskID}`);
        // }
        
        // if (counter < 2){
        //     return "";
        // }
        // else {
        //     const model_name = "jsnfjg";
        //     return model_name;
        // };  

        const url = `https://api.novita.ai/v3/training/subject?task_id=${trainTaskID}`;
        const headers = { 'Authorization': 'Bearer ' + loraAPIkey_novita };

        try {
            const response = await fetch(url, { headers });
            if (response.status_code === 200) {
                const modelStatus_response = await response.json();
                const task_status = modelStatus_response.task_status;
                if (task_status === "SUCCESS") {
                    console.log(`SUCCESS: TRAINING-LORA:\n ${JSON.stringify(modelStatus_response)}`);
                    const model_name = modelStatus_response.models.model_name;
                    return model_name;
                } else {
                    console.log(`TRAINING-STATUS:\n ${task_status}`);
                    return "";
                }
            } else {
                console.log(`ERROR: TRAINING-LORA:\n ${response.text()}`);
                return "";
            }
        } catch {
            console.error("Error in getModelStatus:", error);
            return "";
        }
        
    },


    // 4.2. Start using the trained model
    generateImagewithTrainedLora: async (modelID, prompt) => {

        // console.log(`model ID: ${modelID}`);
        // console.log(`prompt: ${prompt}`);
        // const task_id = "generate task id"
        // return task_id

        const url = "http://api.novita.ai/v2/txt2img";
        const payload = JSON.stringify({
            "model_name": "realisticVisionV51_v51VAE_94301.safetensors",
            "prompt": prompt + `<lora:${modelID}:1>`,
            "negative_prompt": ' ', // no negative prompt
            "batch_size": 1,
            "width": 512,
            "height": 512,
            "sampler_name": "DPM++ 2M Karras",
            "cfg_scale": 7,
            "steps": 30
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + loraAPIkey_novita
        };

        try {
            const response = await fetch(url, { method: 'POST', headers: headers, body: payload });

            if (response.ok) {
                const responseData = await response.json();
                console.log(`SUCCESS: GENERATE-IMAGE-WITH-LORA:\n ${JSON.stringify(responseData)}`);
                return responseData.task_id;
            } else {
                console.error(`ERROR: GENERATE-IMAGE-WITH-LORA:\n ${response.text()}`);
                return null;
            }
        } catch (error) {
            console.error('Error in generateImagewithTrainedLora:', error);
            return null;
        }
        
    },

    // 4.3. Get image
    getImage: async (generateTaskID) => {

        // console.log(`generateTaskID: ${generateTaskID}`);
        // const image_url = "https://blahblah";
        // return image_url;

        const url = "http://api.novita.ai/v2/progress";
        const params = { 'task_id': generateTaskID };
        const headers = { 'Authorization': 'Bearer ' + loraAPIkey_novita };

        try {
            const response = await fetch(ur`${url}?${params}`, { method: 'GET', headers: headers });

            if (response.ok) {
            const responseData = await response.json();
            console.log(`SUCCESS: GET-IMAGE:\n ${JSON.stringify(responseData)}`);
            return responseData.image_url;

        } else {
            console.error(`ERROR: GET-IMAGE:\n ${response.text()}`);
            return null;
        }
        } catch (error) {
            console.error('Error in getImage:', error);
            return null;
        }
        
    },

    // 4.4. Open image
    openImage: async (image_url) => {

        // console.log(`image url: ${image_url}`)

        try {
            const response = await fetch(image_url);
            const image = await response.blob();
            return image;
        } catch (error) {
            console.error('Error in openImage:', error);
            return null;
        }
        
    },

}
