import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("");
  const [fontStyle, setFontStyle] = useState("triple"); // State to track the selected font style
  const [matrixEffect, setMatrixEffect] = useState(false); // State to track if Matrix effect is active
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"], // Triple font style
    arial5: ["font-arial5", "font-arial5", "font-arial5"], // Arial5 font style
    sm00ch: ["font-sm00ch", "font-sm00ch", "font-sm00ch"], // Sm00ch font style
  };

  // Function to generate a random letter
  const getRandomLetter = () => {
    if (fontStyle === "arial5") {
      // For Arial5, use only '5', 's', and 'S'
      const characters = ["5", "s", "S"];
      return characters[Math.floor(Math.random() * characters.length)];
    } else {
      // For other fonts, use the full alphabet
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  };

  // Function to check if the text overflows the container
  const checkOverflow = (text) => {
    return textRefs.some(ref => {
      if (!ref.current || !containerRef.current) return false;
      ref.current.textContent = text; // Set the text content
      const isWidthOverflowing = ref.current.scrollWidth > containerRef.current.clientWidth;
      const isHeightOverflowing = ref.current.scrollHeight > containerRef.current.clientHeight;
      return isWidthOverflowing || isHeightOverflowing;
    });
  };

  // Function to preload the expansion
  const preloadExpansion = () => {
    let text = "";
    while (true) {
      const randomLetter = getRandomLetter();
      const newText = text + randomLetter;

      // Check if the new text overflows the container
      if (checkOverflow(newText)) {
        break; // Stop if the text overflows
      }

      text = newText; // Update the text
    }
    return text;
  };

  // Function to randomize a few letters in the text
  const randomizeLetters = (text) => {
    const textArray = text.split("");
    const numberOfChanges = 1; // Change only 1-2 letters at a time
    for (let i = 0; i < numberOfChanges; i++) {
      const randomIndex = Math.floor(Math.random() * textArray.length);
      textArray[randomIndex] = getRandomLetter();
    }
    return textArray.join("");
  };

  // Effect to handle the Matrix effect
  useEffect(() => {
    let interval;
    if (matrixEffect) {
      interval = setInterval(() => {
        setDisplayText((prevText) => randomizeLetters(prevText));
      }, 1000); // Change letters every 1000ms (1 second)
    }
    return () => clearInterval(interval); // Cleanup interval on unmount or effect change
  }, [matrixEffect, fontStyle]); // Re-run effect when matrixEffect or fontStyle changes

  useEffect(() => {
    // Preload the expansion and set the final text
    const finalText = preloadExpansion();
    setDisplayText(finalText);

    // Add a resize event listener to handle viewport size changes
    const handleResize = () => {
      // Preload the expansion again and update the text
      const newFinalText = preloadExpansion();
      setDisplayText(newFinalText);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fontStyle]); // Re-run effect when fontStyle changes

  return (
    <div ref={containerRef} className="w-full h-full p-6 md:p-2 overflow-hidden relative pointer-events-auto">
      {/* Buttons to switch font styles */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={() => setFontStyle("triple")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Triple Font
        </button>
        <button
          onClick={() => setFontStyle("arial5")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Arial5
        </button>
        <button
          onClick={() => setFontStyle("sm00ch")}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Sm00ch
        </button>
        {/* Button to toggle Matrix effect */}
        <button
          onClick={() => setMatrixEffect((prev) => !prev)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {matrixEffect ? "Stop Matrix" : "Start Matrix"}
        </button>
      </div>

      {/* Render the text with the selected font style */}
      {textRefs.map((ref, index) => (
        <p
          key={index}
          ref={ref}
          className={`text-[9vw] font-bold leading-none text-left break-words z-0 ${fonts[fontStyle][index]}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
            maxHeight: "100%",
            // Normalize font metrics
            fontSize: "9vw", // Ensure consistent font size
            lineHeight: 1, // Ensure consistent line height
            letterSpacing: "0", // Ensure consistent letter spacing
          }}
        >
          {displayText}
        </p>
      ))}
    </div>
  );
}