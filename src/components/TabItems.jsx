import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Image, Box } from '@chakra-ui/react';

const TabItems = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Tabs index={tabIndex} onChange={handleTabChange}>
      <TabList>
        <Tab>Photographer Styles</Tab>
        <Tab>Painting Styles</Tab>
        <Tab>Effects</Tab>
        <Tab>Compositions</Tab>
      </TabList>

      <TabPanels>
          <TabPanel>
            <Box h="900px" overflow="auto"> 
              <Box position="relative">
                  <Image src="/AnselAdams.jpg" alt="Ansel Adams" />
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Ansel Adams
                    </Box>
              </Box>
              <Box position="relative">
                <Image src="/SteveMcCurry.jpg" alt="Steve McCurry"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Steve McCurry
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/HenriCartierBresson.jpg" alt="Henri Cartier-Bresson"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Henri Cartier-Bresson
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/AnnieLeibovitz.jpg" alt="Annie Leibovitz"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Annie Leibovitz
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/AndreasGursky.jpg" alt="Andreas Gursky"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Andreas Gursky
                  </Box>
              </Box>
            </Box>
          </TabPanel>

        
        <TabPanel>
          <Box h="900px" overflow="auto">  
              <Box position="relative">
                  <Image src="/Impressionism.jpg" alt="Impressionism"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Impressionism
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/PopArt.jpg" alt="Pop Art"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Pop Art
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Abstract.jpg" alt="Abstract"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Abstract
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Renaissance.jpg" alt="Renaissance"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Renaissance
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Baroque.jpg" alt="Baroque"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Baroque
                    </Box>
              </Box>
          </Box>
        </TabPanel>
        

        <TabPanel>
          <Box h="900px" overflow="auto"> 
            <Box position="relative">
              <Image src="/Bokeh.jpg" alt="Bokeh"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Bokeh
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Kodak.jpg" alt="Kodak"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Kodak
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Lomo.jpg" alt="Lomo"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Lomo
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/GoldenHour.jpg" alt="Golden Hour"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Golden Hour
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Flash.jpg" alt="Flash"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Flash
              </Box>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel>
            <Box h="900px" overflow="auto"> 
              <Box position="relative">
                  <Image src="/RuleOfThirds.jpg" alt="RuleOfThirds"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Rule Of Thirds
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/GoldenTriangles.jpg" alt="GoldenTriangles"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Golden Triangles
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/GoldenRatio.jpg" alt="GoldenRatio"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Golden Ratio
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/CenteredCompositionAndSymmetry.jpg" alt="CenteredCompositionAndSymmetry"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Centered Composition And Symmetry
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/LeaveNegativeSpace.jpg" alt="LeaveNegativeSpace"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Leave Negative Space
                </Box>
            </Box>
          </Box>
          
        </TabPanel> 
      </TabPanels>
    </Tabs>
  );
};

export default TabItems;
