import React, { Component } from 'react';
import { ChakraProvider, Heading, Box, Text, Image, Flex, Link } from '@chakra-ui/react';


const Home = () => {

        return (
            <ChakraProvider>
                <Box
                    backgroundImage="url('/sdBackground.jpg')" // Adjust the path to your image
                    backgroundSize="cover"
                    backgroundPosition="center"
                    minHeight="100vh"
                    backgroundColor="rgba(255, 255, 255, 0.9)"
                    position="relative"
                >
                {/* <Heading> Put the power of AI in the hands of photographers, transforming the way you create and explore visual possibilities. Let's get started!</Heading> */}
                <Flex justify="center" align="center" height="100vh">
                <Link href="/Txt2Img" _hover={{ textDecoration: 'none' }}>
                    <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4} // Padding
                    m={4} // Margin
                    boxShadow="lg"
                    background={"white"}
                    >
                    <Flex justify="center" mb={4}>
                        <Image src="./txt2img.png" alt="Card Image"/>
                    </Flex>

                    <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    Create Stunning Images with Text-to-Image Generation
                    </Text>

                    <Text mt={2} textAlign="justify">
                        Stable Diffusion is a deep learning model used for converting text to images. It can generate high-quality, photo-realistic images that look like real photographs by simply inputting any text. It cultivates autonomous freedom to produce incredible imagery, empowers billions of people to create stunning art within seconds.
                    </Text>
                    <Text fontStyle={"italic"} fontSize={"12px"} textAlign={"left"}>Sources: <br />
                    https://stability.ai/news/stable-diffusion-public-release <br />
                    https://stablediffusionweb.com/</Text>
                    </Box>
                </Link>

                <Link href="/ModelTraining" _hover={{ textDecoration: 'none' }}>
                    <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4} // Padding
                    m={4} // Margin
                    boxShadow="lg"
                    background={"white"}
                    >
                    <Flex justify="center" mb={4}>
                        <Image src="./PhotorealisticLandscapes.webp" alt="Card Image"/>
                    </Flex>

                    <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    Capture Your Signature Style with LoRA Training
                    </Text>

                    <Text mt={2} textAlign="justify">
                        LoRA (Low-Rank Adaptation) is a novel technique to fine-tune Stable Diffusion models. Train LoRA models with your own photos to perfectly match your unique style or subjects. Allow it to understand your artistic preferences and generate images that seamlessly complement you existing portfolio, try it now! This feature is made using <Link href={"https://novita.ai/"} color={"blue"}>novita.ai</Link> APIs.
                    </Text>
                    <Text fontStyle={"italic"} fontSize={"12px"} textAlign={"left"}>Sources: <br />
                    https://promptbase.com/prompt/photorealistic-landscapes-5 <br />
                    https://stable-diffusion-art.com/lora/ <br />
                    https://civitai.com/articles/2099/lora-models-and-how-to-use-them-with-stable-diffusion-by-thinkdiffusion</Text>
                    </Box>
                </Link>
                </Flex>
                </Box>
                </ChakraProvider>

            
        );
}

export default Home;