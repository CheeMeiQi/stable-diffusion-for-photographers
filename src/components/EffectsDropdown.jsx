// PhotographersDropdown.js
import React from 'react';
import { Select } from "@chakra-ui/react";

const EffectsDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Bokeh', 'Kodak', 'Lomo', 'HDR editing', 'Light Painting', 'Retro', 'Golden Hour', 'Flash', 'Sepia', 'Blur', 'Desaturated', 'High Contrast', 'Long Exposure', 'Comic Book', 'Cinematic', 'Polaroid Photo', 'Scribble', 'Glitch', 'Halftone', 'None'];
    const phrases = [
      ', bokeh effect, blurry background with sharp detail in foreground', 
      ', kodak film effect, light leak effect', 
      ', lomo effect, oversaturated colours, blue tones and vignette burns', 
      ', high dynamic range between light and dark colours',
      ', light painting effect',
      ', retro and vintage filter',
      ', golden hour effect', 
      ', flash effect',
      ', sepia effect, brownn monochromatic colour, rustic, more depth',
      ', tilt-shift blur effect, more depth',
      ', desaturated and muted colours',
      ', high contrast, vivid colours, dark blacks, bright whites',
      ', long exposure effect, narrow aperture, long duration shutter speed',
      ', comic book filter',
      ', cinematic lighting',
      ', polaroid photo effect, polaroid frame',
      ', scribble effect',
      ', glitch effect filter, futuristic, distorted',
      ', dotted halftone pattern effect'
    ];

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
    } else if (selectedOption === 'HDR editing') {
      autofillText = phrases[3];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Light Painting') {
      autofillText = phrases[4];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Retro') {
      autofillText = phrases[5];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Golden Hour') {
        autofillText = phrases[6];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Flash') {
        autofillText = phrases[7];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Sepia') {
      autofillText = phrases[8];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Blur') {
      autofillText = phrases[9];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Desaturated') {
      autofillText = phrases[10];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'High Contrast') {
      autofillText = phrases[11];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Long Exposure') {
      autofillText = phrases[12];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Comic Book') {
      autofillText = phrases[13];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Cinematic') {
      autofillText = phrases[14];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Polaroid Photo') {
      autofillText = phrases[15];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Scribble') {
      autofillText = phrases[16];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Glitch') {
      autofillText = phrases[17];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Halftone') {
      autofillText = phrases[18];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption == 'None'){
        phrases.forEach(phrase => {
          setAutomatedPrompt(prevValue => prevValue.replace(new RegExp(phrase, 'g'), '')); // 'g' flag for global replace
        });
    } else {
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
