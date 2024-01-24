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
  } from "@chakra-ui/react";
  import { useState } from "react";
  import './Txt2Img.css';
  import ErrorMessage from "./ErrorMessage";
  import ExpandableText from "./ExpandableText";
  
  
  const Txt2Img = () => {
  
    const [image, updateImage] = useState(null);
    const [prompt, updatePrompt] = useState("");
    const [loadingImage, updateLoadingImage] = useState(false);
    const [seed, updateSeed] = useState(42);
    const [guidanceScale, updateGuidanceScale] = useState(7.5);
    const [numInfSteps, updateNumInfSteps] = useState(10);
    const [errorMessage, updateErrorMessage] = useState("");
    const [promptImage, updatePromptImage] = useState(null);
  
    const cleanFormData = () => {
      updatePrompt("");
      updateSeed(42);
      updateGuidanceScale(7.5);
      updateNumInfSteps(5);
      updateLoadingImage(false);
      updateErrorMessage("");
    }
  
    const generateImage = async (e) => {
  
      const requestOptions = {
        method: "GET", 
        headers: {"Content-Type": "application/json"}, 
        
    };
  
      updateLoadingImage(true);
  
      const response = await fetch(`http://localhost:8000/api/generate/?prompt=${prompt}&num_inference_steps=${numInfSteps}&guidance_scale=${guidanceScale}&seed=${seed}`, requestOptions);
      
      if (!response.ok){
          updateErrorMessage("Ooops! Something went wrong generating the image");
      } else {
          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          updateImage(imageObjectURL);
          updatePromptImage(prompt);
          cleanFormData();
      }
    }
  
    const submit = (e) => {
      e.preventDefault();
      updateImage(null);
      updatePromptImage(null);
      generateImage();
    }
  
    return (
        <ChakraProvider>
            <Heading className="heading">Text-to-Image Generation</Heading>
            <Text marginBottom={"10px"} fontSize={"18px"}>
            This application uses the model trained by Stability AI. The model can be found in this {" "}
                <Link href={"https://github.com/CompVis/stable-diffusion"} color={"blue"}> Github Repo.</Link>
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={50} p={6} className="page-container">
                {/* Left Column */}
                <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                    <form onSubmit={submit}>
                        <div className="field">
                            <label className="label">Prompt</label>
                            <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            <Textarea
                                placeholder="Enter prompt to generate image e.g., a cute dog"
                                sx={{ '&::placeholder': { lineHeight: "80px" } }}
                                value={prompt}
                                onChange={(e) => updatePrompt(e.target.value)}
                                height="110px"
                                resize="vertical" 
                                required
                            ></Textarea>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Seed</label>
                            <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            <Input
                                type="number"
                                placeholder="Enter seed number e.g., 42"
                                value={seed}
                                onChange={(e) => updateSeed(e.target.value)}
                            ></Input>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Guidance Scale</label>
                            <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            <Input 
                                type="number" 
                                placeholder="Enter guidance scale e.g., 7.5" 
                                value={guidanceScale} 
                                onChange={(e) =>updateGuidanceScale(e.target.value)}
                            ></Input> 
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Number of Inference Steps</label>
                            <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            <Input 
                                type="number" 
                                placeholder="Enter number of inference steps e.g., 10" 
                                value={numInfSteps} 
                                onChange={(e) =>updateNumInfSteps(e.target.value)}
                            ></Input> 
                        </div>
                
                        <ErrorMessage message={errorMessage}/>
                        <Button className="generateButton" colorScheme="orange" type="submit">Generate</Button>
                    </form>
                </GridItem>

                {/* Right Column */}
                <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                    { image ? ( 
                        <Flex align="center" justify="center" height="100%" width="100%">
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
                </GridItem>
            </Grid>
        </ChakraProvider>
    )
  }
  
export default Txt2Img