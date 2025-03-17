import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = ["font-myriad", "font-mutlu", "font-sword"];

  // Function to generate a random letter
  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
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
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full p-6 md:p-2 overflow-hidden relative pointer-events-auto">
      {textRefs.map((ref, index) => (
        <p
          key={index}
          ref={ref}
          className={`text-[9vw] font-bold leading-none text-left break-words z-0 ${fonts[index]}`}
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