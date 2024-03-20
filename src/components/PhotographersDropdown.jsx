// PhotographersDropdown.js
import React from 'react';
import { Select } from "@chakra-ui/react";

const PhotographersDropdown = ({ setAutomatedPrompt }) => {

    const options = ['Ansel Adams', 'Steve McCurry', 'Henri Cartier-Bresson', 'Annie Leibovitz', 'Andreas Gursky', 'Sebastiao Salgado', 'Dorothea Lange', 'Michael Kenna', 'Eliot Porter', 'David Norton', 'Charlie Waite', 'Edward Burtynsky', 'None'];
    const phrases = [
      ', black-and-white landscapes, Ansel Adams style, realism, sharp-focus, with rich tonal range and contrast', 
      ', Steve McCurry style, vivid and saturated colours, Kodachrome film', 
      ', Henri Cartier-Bresson style, humane and spontaneous photograph, black and white film, candid street photography, surrealism, "The Decisive Moment"', 
      ', Annie Leibovitz style, superb lighting, vivid colours, celebrity portraits, theatrical staging', 
      ', Andreas Gursky style, paranomic landscape with intricate patterns, taken with large-format camera, architectural compositions',
      ', Sebastiao Salgado style, documentary photography, black and white, rich tonality, evoking strong emotions, 35mm, ultrarealistic',
      ', Dorothea Lange style, large-format camera, natural lighting, realism, documentary photography, 1936 Depression era, post-war years',
      ', Michael Kenna style, contemporary landscape photography, black and white, serene, minimalist compositions, long exposures, tonal contrast, Kodachrome',
      ', Eliot Porter style, colourful nature photography, forest in the autumn, Kodak box camera, detailed, exquiste colour images of birds',
      ', David Norton style, letterbox-format paranomic landscape, scenic view, colourful, HD, high quality',
      ', Charlie Waite style, award winning landscape photography, spiritual quality of serenity and calm, tranquility',
      ', Edward Burtynsky style, industrial landscapes, 4K, mine tailings, quarries, scrap piles, depicting consequences of global consumerism, large-format camera'
    ];

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
    } else if (selectedOption === 'Sebastiao Salgado') {
      autofillText = phrases[5];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Dorothea Lange') {
      autofillText = phrases[6];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Michael Kenna') {
      autofillText = phrases[7];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Eliot Porter') {
      autofillText = phrases[8];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'David Norton') {
      autofillText = phrases[9];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Charlie Waite') {
      autofillText = phrases[10];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'Edward Burtynsky') {
      autofillText = phrases[11];
      setAutomatedPrompt(prevValue => prevValue + autofillText);
    } else if (selectedOption === 'None') {
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

export default PhotographersDropdown;
