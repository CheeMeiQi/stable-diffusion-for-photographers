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
            <Box h="950px" overflow="auto"> 
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
              <Box position="relative">
                <Image src="/SebastiaoSalgado.jpeg" alt="SebastiaoSalgado"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Sebastiao Salgado
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/DorotheaLange.webp" alt="DorotheaLange"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Dorothea Lange
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/MichaelKenna.jpeg" alt="MichaelKenna"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Michael Kenna
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/EliotPorter.jpg" alt="EliotPorter"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Eliot Porter
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/DavidNorton.webp" alt="DavidNorton"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    David Norton
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/CharlieWaite.webp" alt="CharlieWaite"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Charlie Waite
                  </Box>
              </Box>
              <Box position="relative">
                <Image src="/EdwardBurtynsky.jpeg" alt="EdwardBurtynsky"/>
                  <Box
                    position="absolute"
                    bottom="4"
                    right="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    Edward Burtynsky
                  </Box>
              </Box>
            </Box>
          </TabPanel>

        
        <TabPanel>
          <Box h="950px" overflow="auto">  
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
                  <Image src="/DigitalArt.jpg" alt="DigitalArt"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Digital Art
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/LandArt.jpg" alt="LandArt"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      LandArt
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Minimalism.jpg" alt="Minimalism"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Minimalism
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Photorealism.jpg" alt="Photorealism"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Photorealism
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Surrealism.webp" alt="Surrealism"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Surrealism
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Realism.jpeg" alt="Realism"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Realism
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Watercolour.webp" alt="Watercolour"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Watercolour
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/Fresco.jpg" alt="Fresco"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Fresco
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/PostImpressionism.jpg" alt="PostImpressionism"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Post-Impressionism
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
              <Box position="relative">
                  <Image src="/Neoclassicism.jpg" alt="Neoclassicism"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Neoclassicism
                    </Box>
              </Box>
              <Box position="relative">
                  <Image src="/AvantGarde.jpg" alt="AvantGarde"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Avant-Garde
                    </Box>
              </Box>
          </Box>
        </TabPanel>
        

        <TabPanel>
          <Box h="950px" overflow="auto"> 
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
              <Image src="/HDRediting.jpeg" alt="HDRediting"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  HDR editing
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/LightPainting.jpg" alt="LightPainting"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Light Painting
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Retro.jpg" alt="Retro"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Retro
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
            <Box position="relative">
              <Image src="/Sepia.jpg" alt="Sepia"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Sepia
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Blur.jpg" alt="Blur"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Blur
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Desaturated.webp" alt="Desaturated"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Desatured
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/HighContrast.jpg" alt="HighContrast"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  High Contrast
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/LongExposure.jpg" alt="LongExposure"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Long Exposure
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/ComicBook.webp" alt="ComicBook"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Comic Book
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Cinematic.webp" alt="Cinematic"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Cinematic
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/PolaroidPhoto.webp" alt="PolaroidPhoto"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Polaroid Photo
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Scribble.jpg" alt="Scribble"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Scribble
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Glitch.jpg" alt="Glitch"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Glitch
              </Box>
            </Box>
            <Box position="relative">
              <Image src="/Halftone.webp" alt="Halftone"/>
                <Box
                  position="absolute"
                  bottom="4"
                  right="4"
                  bg="blackAlpha.700"
                  color="white"
                  p="2"
                  borderRadius="md"
                >
                  Halftone
              </Box>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel>
            <Box h="950px" overflow="auto"> 
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
            <Box position="relative">
                  <Image src="/LeadingLines.webp" alt="LeadingLines"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Leading Lines
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/FillTheFrame.jpg" alt="FillTheFrame"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Fill the Frame
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
            <Box position="relative">
                  <Image src="/CenterDominantEye.jpg" alt="CenterDominantEye"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Center Dominant Eye
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/PatternsAndRepetition.jpg" alt="PatternsAndRepetition"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Patterns And Repetition
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
            <Box position="relative">
                  <Image src="/Framing.jpg" alt="Framing"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Framing
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/FigureToGround.webp" alt="FigureToGround"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Figure To Ground
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/Juxtaposition.jpg" alt="Juxtaposition"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Juxtaposition
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/RuleOfOdds.jpg" alt="RuleOfOdds"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Rule Of Odds
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/RuleOfSpace.jpg" alt="RuleOfSpace"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Rule Of Space
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/ShootFromAbove.jpg" alt="ShootFromAbove"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Shoot from Above
                </Box>
            </Box>
            <Box position="relative">
                  <Image src="/ShootFromBelow.jpg" alt="ShootFromBelow"/>
                    <Box
                      position="absolute"
                      bottom="4"
                      right="4"
                      bg="blackAlpha.700"
                      color="white"
                      p="2"
                      borderRadius="md"
                    >
                      Shoot from Below
                </Box>
            </Box>
          </Box>          
        </TabPanel> 
      </TabPanels>
    </Tabs>
  );
};

export default TabItems;
