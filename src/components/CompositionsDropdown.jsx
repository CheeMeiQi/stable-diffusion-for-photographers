// PhotographersDropdown.js
import React, { useState } from 'react';
import { Select } from "@chakra-ui/react";

const CompositionsDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Rule of Thirds', 'Golden Triangles', 'Golden Ratio', 'Centered Composition and Symmetry', 'Leave Negative Space', 'None'];
    const phrases = [', Rule of Thirds composition', ', golden triangles composition', ', golden ratio composition', ', centered composition and symmetry', ', leave negative space'];

  const handleAutofill = (selectedOption) => {
    let autofillText = '';
    if (selectedOption === 'Rule of Thirds') {
        autofillText = phrases[0];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Golden Triangles') {
        autofillText = phrases[1];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Golden Ratio') {
        autofillText = phrases[2];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Centered Composition and Symmetry') {
        autofillText = phrases[3];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Leave Negative Space') {
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

export default CompositionsDropdown;
