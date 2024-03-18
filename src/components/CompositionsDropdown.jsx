// PhotographersDropdown.js
import React from 'react';
import { Select } from "@chakra-ui/react";

const CompositionsDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Rule of Thirds', 'Golden Triangles', 'Golden Ratio', 'Centered Composition and Symmetry', 'Leave Negative Space', 'Leading Lines', 'Fill the Frame', 'Center Dominant Eye', 'Patterns and Repetition', 'Framing', 'Figure to Ground', 'Juxtaposition', 'Rule of Odds', 'Rule of Space', 'Shoot from Above', 'Shoot from Below', 'None'];
    const phrases = [
      ', Rule of Thirds composition',
      ', golden triangles composition', 
      ', golden ratio composition', 
      ', centered composition and symmetry', 
      ', leave negative space',
      ', leading lines',
      ', fill the frame',
      ', center dominant eye',
      ', patterns and repetition',
      ', framing',
      ', figure to ground composition',
      ', juxaposition compositon',
      ', Rule of Odds composition',
      ', Rule of Space composition',
      ', shoot from above',
      ', shoot from below',
    ];

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
    } else if (selectedOption === 'Leading Lines') {
      autofillText = phrases[5];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Fill the Frame') {
      autofillText = phrases[6];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Center Dominant Eye') {
      autofillText = phrases[7];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Patterns and Repetition') {
      autofillText = phrases[8];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Framing') {
      autofillText = phrases[9];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Figure to Ground') {
      autofillText = phrases[10];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Juxtaposition') {
      autofillText = phrases[11];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Rule of Odds') {
      autofillText = phrases[12];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Rule of Space') {
      autofillText = phrases[13];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Shoot from Above') {
      autofillText = phrases[14];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Shoot from Below') {
      autofillText = phrases[15];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'None'){
      phrases.forEach(phrase => {
        setAutomatedPrompt(prevValue => prevValue.replace(new RegExp(phrase, 'g'), ''));
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

export default CompositionsDropdown;
