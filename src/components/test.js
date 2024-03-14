const getAndUploadImage =  async (uploadedImages) => {

    const assetIDs = [];
    for (let i = 1; i <= 10; i++) {
         const fileName = uploadedImages[i].file.name; 
         const fileExtension = fileName.split('.').pop();
        // 1.1. Get image upload URL
        const url = "https://api.novita.ai/v3/assets/training_dataset";
        const payload = { "file_extension": `${fileExtension}` };
        const headers = {
            'Authorization': 'Bearer ' + loraAPIkey_novita,
            'Content-Type': 'application/json'
        };

        try{
            const response = await fetch(url, { method: 'POST', headers: headers, body:  JSON.stringify(payload) });

            if (response.status_code === 200) {
                console.log(`SUCCESS: UPLOAD-IMAGE-URL ${i} RESPONSE:\n ${response.text()}`);
                const image_url_response = await response.json();
                const upload_url = image_url_response.upload_url;
                assetIDs.push(image_url_response.assets_id);

                 // 1.2. Upload images
                const uploadResponse = await fetch(upload_url, { method: 'PUT', headers, data: uploadedImages[i].file });

                if (uploadResponse.ok) {
                    console.log(`SUCCESS: UPLOAD-IMAGE ${i} RESPONSE:\n ${uploadResponse.text()}`);
                } else {
                    console.log(`ERROR: UPLOAD-IMAGE ${i}:\n ${uploadResponse.text()}`);
                }
            } else {
                console.log(`ERROR: UPLOAD-IMAGE-URL ${i}:\n ${response.text()}`);
            }   
        } catch (error){
            console.error(`Error in getAndUploadImage: ${i}:`, error);
        }    
    }
    return assetIDs;
}

getAndUploadImage();