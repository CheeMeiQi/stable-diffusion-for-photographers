import React, { useState } from 'react';
import { Text, Button, ChakraProvider } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const ExpandableText = ({ fullText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ChakraProvider>
        <div>
        {isExpanded ? (
            <Text>{fullText}</Text>
        ) : null}

        <Button
            onClick={toggleExpansion}
            size="sm"
            colorScheme="white"
            color="grey"
            padding="0"
            fontSize="16px"
            fontWeight="normal"
            leftIcon={isExpanded ? <ChevronUpIcon marginRight="-7"/> : <ChevronDownIcon marginRight="-7"/>}
            
        >
            {isExpanded ? 'Show less' : 'Read more'}
        </Button>
        </div>
    </ChakraProvider>
  );
};

export default ExpandableText;
