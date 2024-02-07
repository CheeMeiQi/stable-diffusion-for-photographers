import React, { Component, useState} from 'react';
import {
    Heading,
    Text,
    Input,
    Button,
    Link,
    Progress,
    ChakraProvider,
    Grid, 
    GridItem,
    Textarea,
    Flex,
    CircularProgress,
    List, 
    ListItem,
    Select,
  } from "@chakra-ui/react";
  import './ModelTraining.css';

const ModelTraining = () => {

    const [filePath, updateFilePath] = useState("");
    const [userModelName, updateUserModelName] = useState("");
    const [imageFormat, updateImageFormat] = useState("");
    const [prompt, updatePrompt] = useState("");
    const [instancePrompt, updateInstancePrompt] = useState("");
    const [classPrompt, updateClassPrompt] = useState("");
    // const [loadingImage, updateLoadingImage] = useState(false);
    // const [seed, updateSeed] = useState(42);
    // const [guidanceScale, updateGuidanceScale] = useState(7.5);
    // const [numInfSteps, updateNumInfSteps] = useState(10);
    // const [errorMessage, updateErrorMessage] = useState("");
    // const [promptImage, updatePromptImage] = useState(null);
  
    const cleanFormData = () => {
      
    }

    // 1.1. Get image upoad URL

    // 1.2. Upload images

    // 2.1. Start training task and configure parameters
    const startTraining = (e) => {
        e.preventDefault();
        // updateImage(null);
        // updatePromptImage(null);
        // generateImage();
      }

    // 3.1. Get model training and deployment status

    // 4.1. Start using the trained model

    const startGenerating = (e) => {
        e.preventDefault();
        // updateImage(null);
        // updatePromptImage(null);
        // generateImage();
      }


    
    return (
        <ChakraProvider>

        <Heading className="heading" size="xl">LoRA Training</Heading>
        <Text marginBottom={"10px"} fontSize={"18px"}>
        Explain what a LoRA is. Provide a link to read up more. {" "}
            <Link href={""} color={"blue"}> What is a LoRA?</Link>
        </Text>

        <Grid h="100vh" templateRows="repeat(2, 1fr)" gap={4} maxWidth="max-content" mx="auto">
        <GridItem boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4} maxW="1000px" >
          {/* Content for the first row */}
        <div className="page-container">
            <Heading size="lg">1. Upload example images: Please upload 10 images.</Heading>
            <List spacing={3}>
                <ListItem>a. Crop your images to 512px by 512px 
                          with the main subject in the center of the images.
                </ListItem>
                <div>
                    <label className="label">Select your Images Format</label>
                    <Select placeholder="Select option" onChange={(e) => updateImageFormat(e.target.value)}>
                        <option value={imageFormat}>jpg</option>
                        <option value={imageFormat}>png</option>
                        <option value={imageFormat}>webp</option>
                    </Select>
                </div>
                <ListItem>b. Rename all 10 images from 1 to 10. (E.g. "1.jpg", "2.jpg", etc.) Save all 10 images into a folder in your local work station.</ListItem>
                <ListItem>c. Copy the file path of this folder and paste below.</ListItem>
            </List>
            <div className="file-path">
                <label className="label">File Path</label>
                <Input
                    type="text"
                    placeholder="Enter the file path of your folder"
                    value={filePath}
                    onChange={(e) => updateFilePath(e.target.value)}
                    height="50px"
                    width="500px"
                    marginLeft="10px"
                    required
                ></Input>
            </div>
            <Button className="uploadButton" colorScheme={"orange"} marginLeft="10px">Upload Images</Button>

            <br></br>
            
            <Heading size="lg" marginTop="30px">2. Set training parameters</Heading>
            <form onSubmit={startTraining}>
                <div>
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
                </div>

                <br></br>

                <div>
                    <label className="label">Instance Prompt</label>
                    <Textarea
                        placeholder="Enter a prompt that best describes the example images"
                        value={instancePrompt}
                        onChange={(e) => updateInstancePrompt(e.target.value)}
                        height="50px"
                        width="500px"
                        marginLeft="10px"
                        required
                    ></Textarea>
                </div>

                <br></br>
                {/* KIV */}
                <div>
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

                <br></br>
                
                <div style={{ textAlign: 'center' }}>
                    <Button className="trainButton" type="submit" colorScheme={"orange"} mx="auto">Start Training</Button>
                </div>

            </form>

            <Heading size="lg" marginTop="30px">3. Save trained LoRA </Heading>
            <Text>Get model ID/ model name to use in the future</Text>
            {/* Display modelId if it has been generated */}
        </div>
            
        </GridItem>

        <GridItem boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4} maxW="1000px" mx="auto">
          {/* Content for the second row */}

        <div>
        
            <Heading className="heading" marginTop="50px"> Start generating images with your trained LoRA!</Heading>
            <Text>Get training result and generate images with the trained model</Text>
            <div className="page-container">
            <form onSubmit={startGenerating}>
            <div>
                    <label className="label">Model ID/ Model name</label>
                    {/* change to dropdown to choose which models */}
                    <Input
                        type="text"
                        placeholder="Enter model ID/ model name"
                        value={userModelName}
                        onChange={(e) => updateUserModelName(e.target.value)}
                        height="50px"
                        width="500px"
                        marginLeft="10px"
                        required
                    ></Input>
                    <Text marginLeft="206px" color="red">NOTE: No spaces allowed, use underscore or dashes</Text>
                </div>

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
                <Button className="generateButton" type="submit" colorScheme={"orange"} marginBottom="30px">Generate</Button>
            </div>

            
            </form>
            </div>
        </div>

        </GridItem>

        </Grid>
    </ChakraProvider>
    );
};

export default ModelTraining;