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
import PhotographersDropdown from "./PhotographersDropdown";
import PaintingsDropdown from "./PaintingsDropdown";
import TabItems from "./TabItems";
import EffectsDropdown from "./EffectsDropdown";
import CompositionsDropdown from "./CompositionsDropdown";
import { FaArrowLeft, FaPencilAlt} from 'react-icons/fa';
import { MdChatBubbleOutline, MdKeyboard } from 'react-icons/md';
  
  
  const Txt2Img = () => {
  
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [automatedPrompt, setAutomatedPrompt] = useState("");
    const [loadingImage, setLoadingImage] = useState(false);
    const [seed, setSeed] = useState(42);
    const [guidanceScale, setGuidanceScale] = useState(7.5);
    const [numInfSteps, setNumInfSteps] = useState(20);
    const [errorMessage, setErrorMessage] = useState("");
    const [promptImage, setPromptImage] = useState(null);
    const [showSection, setShowSection] = useState(false);
  
    const cleanFormData = () => {
      setPrompt("");
      setAutomatedPrompt("");
      setSeed(42);
      setGuidanceScale(7.5);
      setNumInfSteps(10);
      setLoadingImage(false);
      setErrorMessage("");
    }

    const updateErrorMessage = (message) => {
        // Convert the object to a string or extract relevant information
        const errorMessageString = typeof message === 'object' ? JSON.stringify(message) : message;
        setErrorMessage(errorMessageString);
      };
  
    const handleGenerateImage = async (e) => {
  
      const requestOptions = {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({
            num_inference_steps: numInfSteps,
            guidance_scale: guidanceScale,
            seed: seed,
            prompt: prompt + automatedPrompt,
        }),   
      };
      
  
      setLoadingImage(true);
      console.log("setLoadingImage is set to true.");
  
      const response = await fetch("http://localhost:8000/api/generate/", requestOptions);
      
    //   if (!response.ok){
    //     //   setErrorMessage("Ooops! Something went wrong generating the image");
    //   } 
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorJson = await response.json();
          // Use the updateErrorMessage function to display the error message
          updateErrorMessage(errorJson.detail);
          console.log(prompt)
        }
        else {
          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImage(imageObjectURL);
          setPromptImage(prompt + automatedPrompt);
          cleanFormData();
      }
    }
  
    const handleSubmit = (e) => {
      console.log("handleSubmit is called.");
      e.preventDefault();
      setImage(null);
      setPromptImage(null);
      handleGenerateImage();
    }

    // Function to toggle the visibility of the section
    const toggleSection = () => {
      setShowSection(!showSection);
      console.log(`loadingImage: ${loadingImage}`);
    };

  
    return (
        <ChakraProvider>
            <Heading className="heading">Text-to-Image Generation</Heading>
            <Text marginLeft={"17%"} marginRight={"17%"} marginBottom={"10px"} fontSize={"18px"}>
            Simply describe your desired image in words and Stable Diffusion model takes your text prompt to generate an original image that matches your description. The model can be found in this {" "}
                <Link href={"https://github.com/runwayml/stable-diffusion"} color={"blue"}> Github Repository.</Link>
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} p={6} className="page-container">

                {/* Left Column */}
                <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                    <TabItems />
                </GridItem>

                {/* Right Column */}
                <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                    <form onSubmit={handleSubmit}>

                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '20px' }}>
                            <FaArrowLeft style={{ fontSize:"40px" }}/>
                            <span style={{ marginLeft: '5px'}}>Refer to the left column for example images to choose Photographer and Painting Styles, Photo Effects and Compositions!  </span>
                        </div>
                        <br />
                        <div className="field">
                            <label className="label">Choose a Photographer Style</label>
                            {/* Button to trigger autofill */}
                            <PhotographersDropdown setAutomatedPrompt={setAutomatedPrompt}/>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Choose a Painting Style</label>
                            {/* Button to trigger autofill */}
                            <PaintingsDropdown setAutomatedPrompt={setAutomatedPrompt}/>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Choose an Effect</label>
                            {/* Button to trigger autofill */}
                            <EffectsDropdown setAutomatedPrompt={setAutomatedPrompt}/>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Choose a Composition</label>
                            {/* Button to trigger autofill */}
                            <CompositionsDropdown setAutomatedPrompt={setAutomatedPrompt}/>
                        </div>

                        <br></br>
                        <br></br>

                        <div className="field">

                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <img src="/photoframe-logo.png" alt="Icon" style={{ width: '35px', height: '35px' }} />
                                <span style={{ marginLeft: '5px' }}>As you choose, text prompts will be autofilled for image generation!</span>
                            </div>
                            <br />


                            <label className="label">Automated Prompts</label>
                            <Textarea
                               isReadOnly 
                               placeholder="To be autofilled"
                               sx={{ '&::placeholder': { lineHeight: "80px" } }}
                               value={automatedPrompt}
                               onChange={(e) => setAutomatedPrompt(e.target.value)}
                               height="110px"
                            ></Textarea>
                        </div>

                        <br></br>

                        <div className="field">
                            <div style={{ display: 'flex', alignItems: 'center', lineHeight: '18px' }}>
                            <FaPencilAlt style={{ fontSize:"30px" }}/>
                            <span style={{ marginLeft: '5px'}}>Add in your own prompt for more details! What do you want to generate?</span>
                            </div>
                            <br />

                            <label className="label">Prompt</label>
                            <ExpandableText fullText="Describe the image you want with details. The more specific your prompt, the better Stable Diffusion can create your desired image. Write about the subject, medium, style, resolution, colour, lighting, etc." />
                            <Textarea
                                placeholder="Enter prompt to generate image e.g., a cute dog"
                                sx={{ '&::placeholder': { lineHeight: "80px" } }}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                height="110px"
                                resize="vertical" 
                                // required
                            ></Textarea>
                        </div>

                        <br></br>

                        <div>
                            <Button onClick={toggleSection}
                                style={{
                                    fontSize: "18px",
                                    // fontWeight: "bold",
                                    textAlign: "center",
                                    position: "relative",
                                    display: "block",
                                    margin: "0 auto",
                                    color: "blue",
                                    background: "transparent",
                                  }}
                                >
                                  <div style={{
                                    display: "inline-block",
                                    position: "relative",
                                  }}>
                                    <span style={{
                                      position: "absolute",
                                      left: "-95%",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      height: "1px",
                                      width: "90%",
                                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    }}></span>
                                    {showSection ? 'Hide Advanced Options' : 'Show Advanced Options'}
                                    <span style={{
                                      position: "absolute",
                                      right: "-95%",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      height: "1px",
                                      width: "90%",
                                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    }}></span>
                                  </div>
                            </Button>
                            {showSection && (
                                <div>
                                {/* Your section content goes here */}
                                <div style={{ padding: '15px' }}>
                                    <div className="field">
                                    <label className="label">Seed</label>
                                    <ExpandableText fullText="Different seeds will lead to completely different images, even with the same prompt and settings. Use the same seed to reproduce an image with the same prompt and settings." />
                                    <Input
                                        type="number"
                                        placeholder="Enter seed number e.g., 42"
                                        value={seed}
                                        onChange={(e) => setSeed(e.target.value)}
                                    ></Input>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Guidance Scale</label>
                            <ExpandableText fullText="This scale controls how closely the generated image follows your text prompt. A higher scale (7~12) will prioritise following your prompt strictly. A lower scale allows for more creative freedom." />
                            <Input 
                                type="number" 
                                placeholder="Enter guidance scale e.g., 7.5" 
                                value={guidanceScale} 
                                onChange={(e) =>setGuidanceScale(e.target.value)}
                            ></Input> 
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Number of Inference Steps</label>
                            <ExpandableText fullText="The higher number of inference steps, the better the image quality (but longer generation time)." />
                            <Input
                                type="number" 
                                placeholder="Enter number of inference steps e.g., 10" 
                                value={numInfSteps} 
                                onChange={(e) =>setNumInfSteps(e.target.value)}
                            ></Input> 
                        </div>
                                </div>
                                </div>
                            )}
                        </div>
                        
                
                        <ErrorMessage message={errorMessage}/>
                        <Button className="generateButton" colorScheme="orange" type="submit">Generate</Button>
                    </form>
                </GridItem>

                <GridItem colSpan={2} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4} height="700px">
                <Heading className="label" size="lg">Output Image</Heading>
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