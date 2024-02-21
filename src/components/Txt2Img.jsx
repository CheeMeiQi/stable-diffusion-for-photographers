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
import ArtistsDropdown from "./ArtistsDropdown";
import TabItems from "./TabItems";
import EffectsDropdown from "./EffectsDropdown";
import CompositionsDropdown from "./CompositionsDropdown";
  
  
  const Txt2Img = () => {
  
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [automatedPrompt, setAutomatedPrompt] = useState("");
    const [loadingImage, setLoadingImage] = useState(false);
    const [seed, setSeed] = useState(42);
    const [guidanceScale, setGuidanceScale] = useState(7.5);
    const [numInfSteps, setNumInfSteps] = useState(10);
    const [errorMessage, setErrorMessage] = useState("");
    const [promptImage, setPromptImage] = useState(null);
  
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
            prompt: prompt,
        }),   
      };
      
  
      setLoadingImage(true);
  
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
          setPromptImage(prompt);
          cleanFormData();
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setImage(null);
      setPromptImage(null);
      handleGenerateImage();
    }

    const [showSection, setShowSection] = useState(false); // State to control visibility

    // Function to toggle the visibility of the section
    const toggleSection = () => {
      setShowSection(!showSection);
    };

  
    return (
        <ChakraProvider>
            <Heading className="heading">Text-to-Image Generation</Heading>
            <Text marginBottom={"10px"} fontSize={"18px"}>
            This application uses the model trained by Stability AI. The model can be found in this {" "}
                <Link href={"https://github.com/runwayml/stable-diffusion"} color={"blue"}> Github Repo.</Link>
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} p={6} className="page-container">

                {/* Left Column */}
                <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                    <TabItems />
                </GridItem>

                {/* Right Column */}
                <GridItem colSpan={1} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4}>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <Text style={{fontSize: "16px"}}> 
                                <Text as="span" fontWeight="bold" color={"red"}>Refer to the tabs on the left column for example images </Text> of photographer and painting styles, photo effects and compositions. <Text as="span" fontWeight="bold" color="orange">Choose your desired styles/effects/compositions below.</Text> <Text as="span" fontWeight="bold" color="green">Text prompts will be generated automatically</Text> to aid in image generation.
                            </Text>
                        </div>

                        <div className="field">
                            <label className="label">Choose a photographer style</label>
                            {/* Button to trigger autofill */}
                            <PhotographersDropdown setPrompt={setPrompt}/>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Choose a painting style</label>
                            {/* Button to trigger autofill */}
                            <ArtistsDropdown setPrompt={setPrompt}/>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Choose an effect</label>
                            {/* Button to trigger autofill */}
                            <EffectsDropdown setPrompt={setPrompt}/>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Choose a composition</label>
                            {/* Button to trigger autofill */}
                            <CompositionsDropdown setPrompt={setPrompt}/>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Automated Prompts</label>
                            <Textarea
                               value={Prompt}
                               onChange={(e) => setPrompt(e.target.value)}
                            ></Textarea>
                        </div>

                        <br></br>

                        <div className="field">
                            <Text style={{fontsize:"1px", fontWeight:"bold", color:"green"}}>Feel free to add in your own prompt for more details!</Text>
                            <label className="label">Prompt</label>
                            <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            <Textarea
                                placeholder="Enter prompt to generate image e.g., a cute dog"
                                sx={{ '&::placeholder': { lineHeight: "80px" } }}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                height="110px"
                                resize="vertical" 
                                required
                            ></Textarea>
                        </div>

                        <br></br>

                        <div>
                            <button onClick={toggleSection} style={{
                                fontSize:"20px",
                                fontWeight:"bold"
                            }}>
                                {showSection ? 'Hide Advanced Options' : 'Show Advanced Options'}
                            </button>
                            {showSection && (
                                <div>
                                {/* Your section content goes here */}
                                <div style={{ padding: '10px' }}>
                                    <div className="field">
                                    <label className="label">Seed (Default: 42)</label>
                                    <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                                    <Input
                                        type="number"
                                        placeholder="Enter seed number e.g., 42"
                                        value={seed}
                                        onChange={(e) => setSeed(e.target.value)}
                                    ></Input>
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Guidance Scale (Default: 7.5)</label>
                            <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            <Input 
                                type="number" 
                                placeholder="Enter guidance scale e.g., 7.5" 
                                value={guidanceScale} 
                                onChange={(e) =>setGuidanceScale(e.target.value)}
                            ></Input> 
                        </div>

                        <br></br>

                        <div className="field">
                            <label className="label">Number of Inference Steps (Default: 10)</label>
                            <ExpandableText fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
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

                <GridItem colSpan={2} boxShadow="0 4px 15px rgba(0, 0, 0, 0.7)" p={4} height="500px">
                    <label className="label">Output</label>
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