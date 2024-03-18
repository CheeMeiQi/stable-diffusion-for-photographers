// PhotographersDropdown.js
import React from 'react';
import { Select } from "@chakra-ui/react";

const PaintingsDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Impressionism', 'Pop Art', 'Abstract', 'Digital Art', 'Land Art', 'Minimalism', 'Photorealism', 'Surrealism', 'Realism', 'Watercolour', 'Fresco','Post-Impressionism', 'Renaissance', 'Baroque', 'Neoclassicism', 'Avant-Garde', 'None'];
    const phrases = [
      ', Impressionist Claude Monet style, sketchy, minimum details, few brushstrokes, fleeting moment, naturalistic lighting',
      ', Pop Art Andy Warhol style, mass media, consumer culture, popular imagery, gimmicky, bold colours, clean lines', 
      ', Abstract style, geometric shapes, gestural marks, patterns, ambiguous, organic shapes',
      ', Digital Art style',
      ', Land Art, Earth Art, landscape structures using natural materials, twigs and rocks',
      ', Minimalism, simple, geometric shapes, little representational content, ',
      ', Photorealism, highly detailed, flawless',
      ', Surrealism, uncommon imagery, uncanny, illogical expression, imgainative shapes',
      ', Realism, real life portrayal',
      ', Watercolour painting style',
      ', Fresco, mural painting, vibrant colours',
      ', Post-Impressionist Vincent van Gogh style, vivid colours, expressive',
      ', Renaissance Leonardo da Vinci style, naturalistic human forms and landscape, realistic', 
      ', Baroque style, exaggerted motion and porportions, dramatic, intense light and dark shadows',
      ', Neoclassicism style, form clarity, sober colours, shallow space, symmetry, unemotional',
      ', Avant-Garde style, innovative, out-of-the-box'
    ];

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
    } else if (selectedOption === 'Digital Art') {
        autofillText = phrases[3];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Land Art') {
        autofillText = phrases[4];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Minimalism') {
        autofillText = phrases[5];
        setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Photorealism') {
      autofillText = phrases[6];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Surrealism') {
      autofillText = phrases[7];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Realism') {
      autofillText = phrases[8];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Watercolour') {
      autofillText = phrases[9];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Fresco') {
      autofillText = phrases[10];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Post-Impressionism') {
      autofillText = phrases[11];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Renaissance') {
      autofillText = phrases[12];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Baroque') {
      autofillText = phrases[13];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Neoclassicism') {
      autofillText = phrases[14];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Avant-Garde') {
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

export default PaintingsDropdown;
