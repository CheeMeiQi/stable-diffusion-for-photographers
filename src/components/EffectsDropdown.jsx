// PhotographersDropdown.js
import React, { useState } from 'react';
import { Select } from "@chakra-ui/react";

const EffectsDropdown = ({ setPrompt }) => {

    const options = ['Bokeh', 'Kodak', 'Lomo', 'Golden Hour', 'Flash'];

  const handleAutofill = (selectedOption) => {
    let autofillText = '';
    if (selectedOption === 'Bokeh') {
        autofillText = ', bokeh effect';
    } else if (selectedOption === 'Kodak') {
        autofillText = ', kodak film effect';
    } else if (selectedOption === 'Lomo') {
        autofillText = ', lomo effect';
    } else if (selectedOption === 'Golden Hour') {
        autofillText = ', golden hour effect';
    } else if (selectedOption === 'Flash') {
        autofillText = ', flash effect';
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

export default EffectsDropdown;
