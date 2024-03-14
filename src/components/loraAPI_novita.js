import { loraAPIkey_novita } from  "./auth_token.js";

export const loraAPI = {
    
    // 1.1. Get image upload URL and upload the images (10x)
    getAndUploadImage: async (uploadedImages) => {
        // const uploadedImagesDict = {};

        // uploadedImages.forEach((image, index) => {
        //     const fileObject = image.file;
        //     const caption = image.caption;
        //     const key = `file${index}`; // Generate a unique key for each file
        //     uploadedImagesDict[key] = { file: fileObject, caption: caption };
        // });

        // for (let i=0; i<10;i++){
        //     console.log(uploadedImagesDict[`file${i}`]['file']);
        //     console.log(uploadedImagesDict[`file${i}`]['file']['name']);
        //     console.log(uploadedImagesDict[`file${i}`]['caption']);
        // }

        const formData = new FormData();
            for (let i = 0; i < 10; i++) {
                formData.append(`file${i}`, uploadedImages[i].file);
            }

        try {
            const response = await fetch('http://localhost:8000/api/getAndUploadImages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const assetIDs = await response.json();
                console.log('Uploaded image asset IDs:', assetIDs.assetIDs);
            } else {
                console.error('Error uploading images:', await response.text());
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
        
    },

    // 2.1. Start training task and configure parameters
    trainLora: async (userModelName, assetIDs, uploadedImages, instancePrompt, classPrompt) => {

        
    },

    // 3.1. Get model training and deployment status
    getModelStatus: async (trainTaskID) => {
        
    },


    // 4.2. Start using the trained model
    generateImagewithTrainedLora: async (modelID, prompt) => {

       
    },

    // 4.3. Get image
    getImage: async (generateTaskID) => {

        
        
    },

    // 4.4. Open image
    openImage: async (image_url) => {

        
        
    },

}
