// PhotographersDropdown.js
import React, { useState } from 'react';
import { Select } from "@chakra-ui/react";

const EffectsDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Bokeh', 'Kodak', 'Lomo', 'Golden Hour', 'Flash', 'None'];
    const phrases = [', bokeh effect', ', kodak film effect', ', lomo effect', ', golden hour effect', ', flash effect'];

  const handleAutofill = (selectedOption) => {
    let autofillText = '';
    if (selectedOption === 'Bokeh') {
        autofillText = phrases[0];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Kodak') {
        autofillText = phrases[1];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Lomo') {
        autofillText = phrases[2];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Golden Hour') {
        autofillText = phrases[3];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Flash') {
        autofillText = phrases[4];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    }
    else if (selectedOption == 'None'){
        phrases.forEach(phrase => {
          setAutomatedPrompt(prevValue => prevValue.replace(new RegExp(phrase, 'g'), '')); // 'g' flag for global replace
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

export default EffectsDropdown;
