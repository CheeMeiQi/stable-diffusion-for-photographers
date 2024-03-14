import { loraAPIkey_novita } from  "./auth_token.js";

export const loraAPI = {
    
    // 1.1. Get image upload URL and upload the images (10x)
    getAndUploadImage: async (uploadedImages) => {
        
        const assetIDs = [];
        try {
            for (let i = 0; i < uploadedImages.length; i++) {
                const formData = new FormData();
                // formData.append('caption', uploadedImages[i].caption);
                formData.append('file', uploadedImages[i].file);
                
                const response = await fetch('http://localhost:8000/api/getAndUploadImages/', {
                    method: 'POST',
                    body: formData
                });
                
                const responseText = await response.text();
                const responseJson = JSON.parse(responseText);

                if (response.ok) {   
                    const assetID = responseJson['assetID'];
                    console.log(`asset ID for image ${i}: ${assetID}`);
                    assetIDs.push(assetID);
   
                } else {
                    console.log('Error uploading image:', responseText);
                }
            }
        } catch (error) {
            console.log('Error uploading images:', error);
        }
        return assetIDs;
    },

    // 2.1. Start training task and configure parameters
    trainLora: async (userModelName, assetIDsPromise, uploadedImages, instancePrompt, classPrompt) => {

        try {
            const assetIDs = await assetIDsPromise;
            const formData = new FormData();
    
            for (let i = 0; i < uploadedImages.length; i++) {
                // formData.append(`file${i}`, uploadedImages[i].file);
                formData.append(`captions`, uploadedImages[i].caption);
            }
            formData.append('userModelName', userModelName);
            formData.append('assetIDs', assetIDs);
            formData.append('instancePrompt', instancePrompt);
            formData.append('classPrompt', classPrompt);

            const response = await fetch('http://localhost:8000/api/trainLora/', {
                method: 'POST',
                body: formData
            });

            const responseText = await response.text();
            const responseJson = JSON.parse(responseText);

            if (response.ok) {   
                const task_id = responseJson['task_id'];
                console.log(`task id for training lora: ${task_id}`);
                return task_id;

            } else {
                console.log('Error training lora:', responseText);
                // console.trace();
            }

        } catch (error) {
            console.log('Error training lora:', error);
            // console.trace();
        }
    },

    // 3.1. Get model training and deployment status
    getModelStatus: async (trainTaskIDPromise) => {
        try {
            const trainTaskID = await trainTaskIDPromise;
            const formData = new FormData();
            formData.append('trainTaskID', trainTaskID);

            const response = await fetch('http://localhost:8000/api/getModelStatus/', {
                method: 'POST',
                body: formData
            });

            const responseText = await response.text();
            const responseJson = JSON.parse(responseText);

            if (response.ok) {   
                const task_status = responseJson['task_status'];
                if (task_status == "SUCCESS") {
                    const model_name = responseJson['model_name'];
                    console.log(`model name for lora: ${model_name}`);
                    return { 'task_status': task_status, 'model_name': model_name };
                } else { //failed or unknown or cancelled
                    console.log(`training status: ${task_status}`);
                    const model_name = responseJson['model_name'];
                    return { 'task_status': task_status, 'model_name': model_name };
                }
                

            } else {
                console.log('Error getting model status:', responseText);
                // console.trace();
            }


        } catch (error) {
            console.log('Error getting model status:', error);
            // console.trace();
        }
    
    },


    // 4.2. Start using the trained model
    generateImagewithTrainedLora: async (modelIDPromise, prompt) => {
        try {
            const modelID = await modelIDPromise;
            const formData = new FormData();
            formData.append('modelID', modelID);
            formData.append('prompt', prompt);

            const response = await fetch('http://localhost:8000/api/generateImagewithTrainedLora/', {
                method: 'POST',
                body: formData
            });

            const responseText = await response.text();
            const responseJson = JSON.parse(responseText);

            if (response.ok) {   
                console.log(`Generate task_id:\n ${responseJson['task_id']}`);
                return responseJson['task_id'];
            } else {
                console.error(`Error generating image with trained lora:\n ${responseText}`);
                return null;
            }
        } catch (error) {
            console.log('Error generating image with trained lora:', error);
            // console.trace();
        }
       
    },

    // 4.3. Get image
    getImage: async (generateTaskIDPromise) => {

        try {
            const generateTaskID = await generateTaskIDPromise;
            const formData = new FormData();
            formData.append('generateTaskID', generateTaskID);

            const response = await fetch('http://localhost:8000/api/getImage/', {
                method: 'POST',
                body: formData
            });

            const responseText = await response.text();
            const responseJson = JSON.parse(responseText);

            if (response.ok) {   
                console.log(`Get image url:\n ${responseJson['image_url']}`);
                return responseJson['image_url'];
            } else {
                console.error(`Error generating image with trained lora:\n ${responseText}`);
                return null;
            }
        } catch (error) {
            console.log('Error getting image url:', error);
            // console.trace();
        }
        
    },

    // 4.4. Open image
    openImage: async (image_url) => {

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
