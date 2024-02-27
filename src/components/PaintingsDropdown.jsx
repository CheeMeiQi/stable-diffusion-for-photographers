// PhotographersDropdown.js
import React, { useState } from 'react';
import { Select } from "@chakra-ui/react";

const PaintingsDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Impressionism', 'Pop Art', 'Abstract', 'Renaissance', 'Baroque', 'None'];
    const phrases = [', impressionist style', ', Pop Art style', ', abstract style', ', renaissance style', ', baroque style'];

  const handleAutofill = (selectedOption) => {
    let autofillText = '';
    if (selectedOption === 'Impressionism') {
        autofillText = phrases[0];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Pop Art') {
        autofillText = phrases[1];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Abstract') {
        autofillText = phrases[2];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Renaissance') {
        autofillText = phrases[3];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Baroque') {
        autofillText = phrases[4];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'None'){
        phrases.forEach(phrase => {
          setAutomatedPrompt(prevValue => prevValue.replace(new RegExp(phrase, 'g'), ''));
        });
    }
    else{
        autofillText = ''
    }
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

export default PaintingsDropdown;
