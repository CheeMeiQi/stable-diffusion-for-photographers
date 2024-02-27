// PhotographersDropdown.js
import React, { useState } from 'react';
import { Select } from "@chakra-ui/react";

const PhotographersDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Ansel Adams', 'Steve McCurry', 'Henri Cartier-Bresson', 'Annie Leibovitz', 'Andreas Gursky', 'None'];
    const phrases = [', black-and-white photography, Ansel Adams style', ', Steve McCurry style', ', Henri Cartier-Bresson style', ', Annie Leibovitz style', ', Andreas Gursky style'];

  const handleAutofill = (selectedOption) => {
    let autofillText = '';
    if (selectedOption === 'Ansel Adams') {
        autofillText = phrases[0];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Steve McCurry') {
        autofillText = phrases[1];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Henri Cartier-Bresson') {
        autofillText = phrases[2];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Annie Leibovitz') {
        autofillText = phrases[3];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Andreas Gursky') {
        autofillText = phrases[4];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'None') {
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

export default PhotographersDropdown;
