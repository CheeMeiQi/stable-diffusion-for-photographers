// PhotographersDropdown.js
import React, { useState } from 'react';
import { Select } from "@chakra-ui/react";

const ArtistsDropdown = ({ setPrompt }) => {

    const options = ['Impressionism', 'Pop Art', 'Abstract', 'Renaissance', 'Baroque'];

  const handleAutofill = (selectedOption) => {
    let autofillText = '';
    if (selectedOption === 'Impressionism') {
        autofillText = ', impressionist style';
    } else if (selectedOption === 'Pop Art') {
        autofillText = ', Pop Art style';
    } else if (selectedOption === 'Abstract') {
        autofillText = ', abstract style';
    } else if (selectedOption === 'Renaissance') {
        autofillText = ', renaissance style';
    } else if (selectedOption === 'Baroque') {
        autofillText = ', baroque style';
    }
    else{
        autofillText = ''
    }
    setPrompt(prevValue => prevValue + autofillText);

  };

  return (
    <div>
      <Select placeholder="Select an option" onChange={(e) => handleAutofill(e.target.value)}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Select>
    </div>
  );
};

export default ArtistsDropdown;
