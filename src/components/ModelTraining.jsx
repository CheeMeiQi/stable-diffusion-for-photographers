import React, { useState, useEffect} from 'react';
import {
    Heading,
    Text,
    Input,
    Button,
    Link,
    ChakraProvider,
    Grid, 
    GridItem,
    Textarea,
    Flex,
    CircularProgress,
    List, 
    ListItem,
    Tr,
    Td,
    Th,
    Table,
    Thead,
    Tbody,
    Img,
  } from "@chakra-ui/react";
  import './ModelTraining.css';
  import { loraAPI } from './loraAPI_novita';
  import { DateTime } from 'luxon';
  import { FiCheckCircle } from 'react-icons/fi';

const ModelTraining = () => {

    const [filePath, updateFilePath] = useState("");
    const [prompt, updatePrompt] = useState("");
    const [instancePrompt, updateInstancePrompt] = useState("");
    const [uploadedImages, updateUploadedImages] = useState([]);
    const [showTable, updateShowTable] = useState(false);
    const [assetIDs, updateAssetIDs] = useState([]);
    // var trainTaskID = "";
    const [trainTaskID, updateTrainTaskID] = useState(null);
    const [modelID, updateModelID] = useState("");
    var generateTaskID = null;
    // const [generateTaskID, updateGenerateTaskID] = useState(null);
    const [image, updateImage] = useState(null);
    const [loadingImage, updateLoadingImage] = useState(false);
    const [loadingModel, updateLoadingModel] = useState(false);
    var current_datetime = "";
    // var counter = 0;

    // Function to retrieve files from the specified directory
    const retrieveFiles = () => {
        const folderInput = document.getElementById('folderDir');

        const files = folderInput.files;
        const fileList = Array.from(files).filter(file => file.type.startsWith('image/'));
        const fileListWithCaptions = fileList.map(file => ({ file, caption: '' }));
        updateUploadedImages(fileListWithCaptions);
        updateShowTable(true);
    };

    // Function to handle caption input change
    const handleCaptionChange = (index, e) => {
        // console.log(index);
        const updatedImages = [...uploadedImages];
        updatedImages[index].caption = e.target.value;
        updateUploadedImages(updatedImages);
    };

    // Render table rows for each image
    const renderImageRows = () => {

        return uploadedImages.map((image, index) => (
            <Tr key={index}>
                <Td>
                    <Flex align="center" direction="column">
                        <Img src={URL.createObjectURL(image.file)} alt={`Image ${index}`} maxW="150px" maxH="150px" />
                        <Text fontSize="sm">{image.file.name}</Text>
                    </Flex>
                </Td>
                <Td><Input type="text" value={image.caption} onChange={(e) => handleCaptionChange(index, e)} /></Td>
            </Tr>
        ));
    };

    // 1.1. Get image upoad URL
    // 1.2. Upload images
    const handleUploadImages = (e) => {
        const assetIDs = loraAPI.getAndUploadImage(uploadedImages);
        updateAssetIDs(assetIDs);
    }

    // 2.1. Start training task and configure parameters
    const handleTraining = (e) => {
        e.preventDefault();
        const userModelName = `test_${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`;
        const classPrompt = "Person";
        const trainTaskID = loraAPI.trainLora(userModelName, assetIDs, uploadedImages, instancePrompt, classPrompt);
        updateTrainTaskID(trainTaskID); 
        handleTrainingStatus();
      }

    // 3.1. Get model training and deployment status
    const handleTrainingStatus = (e) => {
        // counter =  counter + 1;
        updateLoadingModel(true);
        const modelID =  loraAPI.getModelStatus(trainTaskID);
        updateModelID(modelID);
        if (modelID !== "") {
            updateLoadingModel(false);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(handleTrainingStatus, 10000);

        // Clear interval when model ID is available
        if (!loadingModel) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [loadingModel, trainTaskID]);


    // 4.1. Get model name from user
    // 4.2. Start using the trained model

    const handleGenerating = (e) => {
        e.preventDefault();
        updateLoadingImage(true);
        updatePrompt(prompt);
        generateTaskID = loraAPI.generateImagewithTrainedLora(modelID, prompt);
        // updateGenerateTaskID(generateTaskID);
        handleGetImage();
      }

    const handleGetImage = (e) => {
        const imageURL = loraAPI.getImage(generateTaskID);
        const image = loraAPI.openImage(imageURL);
        updateImage(image);
        current_datetime = DateTime.now().toISO();
        const save_path = `../../backend/images/${modelID}_${current_datetime}.png`;
        image.save(save_path);
        console.log(`image saved. ${current_datetime}`);
        updateLoadingImage(false);
    }

    
    return (
        <ChakraProvider>

        <Heading className="heading" size="xl">LoRA Training</Heading>
        <Text marginLeft={"220px"} marginRight={"220px"} fontSize={"18px"}>
            <Link href={"https://huggingface.co/blog/lora"} color={"blue"}> What is a LoRA? </Link>
        LoRA (Low-Rank Adaptation) is a training technique for fine-tuning Stable Diffusion models. They are much smaller than checkpoint models. Train LoRA models to adapt your artwork subjects or styles!
            
        </Text>

        <Grid templateColumns="repeat(2, 1fr)" gap={5} p={3} className="page-container">

            <GridItem colSpan={2} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4} >
            <div style={{ minHeight: showTable ? 'auto' : '100vh', textAlign:"center"}}>
                <Heading size="lg" marginTop="10px">1. Upload 10 Example Images</Heading>
                <br></br>
                <List spacing={3} className="list-items">
                    <ListItem>a. Prepare 10 images in png, jpeg or webp format.
                    </ListItem>
                    <ListItem>b. Crop your images to 512px by 512px 
                            with the main subject in the center of the images.
                    </ListItem>
                    {/* <div>
                        <label className="label">Select your Images Format</label>
                        <Select placeholder="Select option" onChange={(e) => updateImageFormat(e.target.value)}>
                            <option value="jpg">jpg</option>
                            <option value="png">png</option>
                            <option value="webp">webp</option>
                        </Select>
                    </div> */}
                    <ListItem>c. Save all 10 images in the same folder in your work station.</ListItem>
                    <ListItem>d. Choose your folder below to retrieve your images and insert captions.</ListItem>

                    <div className="file-path">
                    <label className="label">File Path</label>
                    <Input
                        id="folderDir"
                        type="file"
                        webkitdirectory="" directory=""
                        placeholder="Enter the file path of your folder"
                        value={filePath}
                        onChange={(e) => updateFilePath(e.target.value)}
                        height="50px"
                        width="500px"
                        marginLeft="10px"
                        required
                    ></Input>
                    <Button className="button" colorScheme={"orange"} marginLeft="10px" onClick={retrieveFiles}>Retrieve Images</Button>
                </div>
                </List>

                {  showTable ? (
                    <div>
                        <Table>
                        <Thead>
                            <Tr>
                                <Th textAlign={"center"} fontSize={"20px"}>Image</Th>
                                <Th textAlign={"center"} fontSize={"20px"}>Caption</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {renderImageRows()}
                        </Tbody>
                    </Table>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className="button" colorScheme={"orange"} marginTop={"15px"} onClick={handleUploadImages}>Upload Images with Captions</Button>
            </div> 
                    </div>
                 ) : <></>}

                <br></br>
                
                <Heading size="lg" marginTop="30px">2. Set Training Parameters</Heading>
                <form onSubmit={handleTraining}>
                    {/* <div>
                        <label className="label">Name of Model</label>
                        <Input
                            type="text"
                            placeholder="Enter how you want to name your model"
                            value={userModelName}
                            onChange={(e) => updateUserModelName(e.target.value)}
                            height="50px"
                            width="500px"
                            marginLeft="10px"
                            required
                        ></Input>
                        <Text marginLeft="142px" color="red">NOTE: No spaces allowed, use underscore or dashes</Text>
                    </div> */}

                    <br></br>
                    <Text>Enter the most suitable prompt that best describes all your example images.</Text>
                    <div>
                        <label className="label">Instance Prompt</label>
                        <Textarea
                            placeholder="Enter instance prompt for training"
                            value={instancePrompt}
                            onChange={(e) => updateInstancePrompt(e.target.value)}
                            height="50px"
                            width="500px"
                            marginLeft="10px"
                            required
                        ></Textarea>
                    

                    {/* KIV */}
                    {/* <div>
                        <label className="label">Class Prompt</label>
                        <Textarea
                            placeholder="Enter a prompt that makes the training more like specific style e.g., landscape, seascape"
                            value={classPrompt}
                            onChange={(e) => updateClassPrompt(e.target.value)}
                            height="50px"
                            width="500px"
                            marginLeft="10px"
                            required
                        ></Textarea>  
                    </div>

                    <br></br> */}
                    
                    <Button className="button" type="submit" colorScheme={"orange"} marginLeft="10px" >Start Training</Button>
                    </div>

                </form>
                    <br />
                <Heading size="lg" marginTop="30px">3. Training Status </Heading>
                <br></br>
                <Text fontStyle="italic" color="gray">You will see your model training  status here.</Text>
                {loadingModel ? (
                     <Flex align="center" justify="center" height="100%" direction="column">
                     <CircularProgress isIndeterminate color='orange' size="120px"thickness="12px"/>
                     <Text mt={5}>Please wait while your model is generating...</Text>
                 </Flex>
                ) : (
                    modelID && ( 
                        <Flex align="center" justify="center">
                            <FiCheckCircle style={{ color: 'green', fontSize: '24px', marginRight: "5px"}} /> 
                            <Text>Your model has been generated successfully! Model ID: 
                            <Text as="span" fontWeight="bold"> {modelID}</Text></Text>
                        </Flex>
                    )
                )}
                {/* <Button className="button" colorScheme={"orange"} onClick={handleTrainingStatus}>Get training status</Button> */}
            </div>
                <br />
            </GridItem>

            {/* Left Column */}
            <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                <div style={{textAlign: "center"}}>

                
                <Heading className="label" size="lg" margin="5px"> Start generating images with your trained LoRA!</Heading>
                <br />
                <Text>Enter the model ID and prompt to generate images with it.</Text>


                <form onSubmit={handleGenerating}>
                <div>
                        <label className="label">Model ID</label>
                        {/* change to dropdown to choose which models */}
                        <Input
                            type="text"
                            placeholder="Enter model ID"
                            value={modelID}
                            onChange={(e) => updateModelID.modelID(e.target.value)}
                            height="50px"
                            width="500px"
                            marginLeft="10px"
                            required
                        ></Input>
                    </div>

                <br />

                <div>
                    <label className="label">Prompt</label>
                    <Textarea
                        placeholder="Enter prompt to generate image e.g., Eiffel Tower"
                        value={prompt}
                        onChange={(e) => updatePrompt(e.target.value)}
                        height="110px"
                        width="500px"
                        resize="vertical" 
                        marginLeft="10px"
                        required
                    ></Textarea>
                </div>

                <br></br>

                <div style={{ textAlign: 'center' }}>
                    <Button className="generateButton" type="submit" colorScheme={"orange"} marginBottom="10px">Generate</Button>
                </div>

                
                </form>
                </div>

            </GridItem>
            {/* Right Column */}
            <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                <div style={{textAlign: "center"}}>

                
            <Heading className="label" size="lg" margin="5px">Output Image</Heading>
                    { image ? ( 
                            <Flex align="center" justify="center" height="100%" width="100%">
                                <Text>Image is saved to ./images/{modelID}_{current_datetime}.png</Text>
                                <figure>
                                    <img src={image} alt="genimage" className="genImage"/>
                                    <figcaption style={{ textAlign: "center", marginTop: "5px"}}>{promptImage}</figcaption>
                                </figure>
                            </Flex>
                            ) 
                                : <></>
                        } 
                         { loadingImage ? (
                                <Flex align="center" justify="center" height="100%" direction="column">
                                    <CircularProgress isIndeterminate color='orange' size="120px"thickness="12px"/>
                                    <Text mt={5}>Please wait while your image is generating...</Text>
                                </Flex>
                            ) : <></>
                        }         
                        </div>
            </GridItem>
        </Grid>
    </ChakraProvider>
    );
};

export default ModelTraining;