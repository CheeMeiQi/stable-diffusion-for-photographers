import React, { Component } from 'react';
import { ChakraProvider, Heading, Box, Text, Image, Flex } from '@chakra-ui/react';


const Home = () => {

        return (
            <ChakraProvider>
                <Heading>Write an intro to this app</Heading>
                <Flex justify="center" align="center" height="100vh">
                    <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4} // Padding
                    m={4} // Margin
                    boxShadow="lg" // Optional shadow
                    >
                    <Flex justify="center">
                        <Image src="https://via.placeholder.com/150" alt="Card Image" mb={4} />
                    </Flex>

                    <Text fontSize="xl" fontWeight="bold" textAlign="center">
                        Text-to-Image Generation
                    </Text>

                    <Text mt={2} textAlign="center">
                        Feature Description goes here.
                    </Text>
                    </Box>

                    <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4} // Padding
                    m={4} // Margin
                    boxShadow="lg" // Optional shadow
                    >
                    <Flex justify="center">
                        <Image src="https://via.placeholder.com/150" alt="Card Image" mb={4} />
                    </Flex>

                    <Text fontSize="xl" fontWeight="bold" textAlign="center">
                        Train a LoRA model
                    </Text>

                    <Text mt={2} textAlign="center">
                        Feature Description goes here.
                    </Text>
                    </Box>
                </Flex>
                </ChakraProvider>

            
        );
}

export default Home;