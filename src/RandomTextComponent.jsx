import React, { useState, useEffect, useRef } from 'react';
import './styles.css'; // Make sure to import your styles

const RandomTextComponent = () => {
  const [randomText, setRandomText] = useState('');
  const containerRef = useRef(null);

  // Function to generate random text
  const generateRandomText = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let text = '';
    for (let i = 0; i < 50; i++) { // Adjust the length of the text as needed
      text += letters[Math.floor(Math.random() * letters.length)];
    }
    return text;
  };

  // Function to generate text that fits the container
  const generateFittedText = () => {
    const container = containerRef.current;
    if (!container) return '';

    // Get container dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Approximate character width and line height
    const fontSize = parseFloat(window.getComputedStyle(container).fontSize);
    const charWidth = fontSize * 0.6; // Approximate width of a character
    const lineHeight = fontSize * 1.2; // Approximate line height

    // Calculate max characters per line and max lines
    const maxCharsPerLine = Math.floor(containerWidth / charWidth);
    const maxLines = Math.floor(containerHeight / lineHeight);

    // Generate text
    let text = '';
    for (let i = 0; i < maxLines; i++) {
      let line = '';
      for (let j = 0; j < maxCharsPerLine; j++) {
        line += generateRandomText()[0]; // Add one random character at a time
      }
      text += line + '\n';
    }

    return text;
  };

  // Generate fitted text only once when the component mounts
  useEffect(() => {
    setRandomText(generateFittedText());
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="random-text-container" ref={containerRef}>
      <div className="font-sword">{randomText}</div>
      <div className="font-myriad">{randomText}</div>
      <div className="font-mutlu">{randomText}</div>
    </div>
  );
};

export default RandomTextComponent;