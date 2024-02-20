// PhotographersDropdown.js
import React, { useState } from 'react';
import { Select } from "@chakra-ui/react";

const PhotographersDropdown = ({ setPrompt }) => {

    const options = ['Ansel Adams', 'Steve McCurry', 'Henri Cartier-Bresson', 'Annie Leibovitz', 'Andreas Gursky'];

  const handleAutofill = (selectedOption) => {
    let autofillText = '';
    if (selectedOption === 'Ansel Adams') {
        autofillText = ', black-and-white photography, Ansel Adams style';
    } else if (selectedOption === 'Steve McCurry') {
        autofillText = ', Steve  McCurry style';
    } else if (selectedOption === 'Henri Cartier-Bresson') {
        autofillText = ', Henri Cartier-Bresson style';
    } else if (selectedOption === 'Annie Leibovitz') {
        autofillText = ', Annie Leibovitz style';
    } else if (selectedOption === 'Andreas Gursky') {
        autofillText = ', Andreas Gursky style';
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

export default PhotographersDropdown;
