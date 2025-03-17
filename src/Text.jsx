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
  const checkOverflow = () => {
    return textRefs.some(ref => {
      if (!ref.current || !containerRef.current) return false;
      const isWidthOverflowing = ref.current.scrollWidth > containerRef.current.clientWidth;
      const isHeightOverflowing = ref.current.scrollHeight > containerRef.current.clientHeight;
      return isWidthOverflowing || isHeightOverflowing;
    });
  };

  useEffect(() => {
    let text = "";
    let interval;

    const startExpansion = () => {
      interval = setInterval(() => {
        if (!containerRef.current || textRefs.some(ref => !ref.current)) return;

        // Generate a random letter
        const randomLetter = getRandomLetter();

        // Temporarily add the random letter to test if it will overflow
        textRefs.forEach(ref => {
          ref.current.textContent = text + randomLetter;
        });

        // Check if ANY of the fonts overflow the container
        const isOverflowing = checkOverflow();

        if (isOverflowing) {
          // If ANY font overflows, revert to the last valid text for ALL fonts
          textRefs.forEach(ref => {
            ref.current.textContent = text;
          });
          clearInterval(interval);
          return;
        }

        // If no overflow, permanently add the random letter
        text += randomLetter;
        setDisplayText(text);
      }, 50);
    };

    // Start the initial expansion
    startExpansion();

    // Add a resize event listener to handle viewport size changes
    const handleResize = () => {
      // Clear the existing interval
      clearInterval(interval);

      // Check if the container size has increased
      const isContainerLarger = textRefs.some(ref => {
        if (!ref.current || !containerRef.current) return false;
        const isWidthSmaller = ref.current.scrollWidth < containerRef.current.clientWidth;
        const isHeightSmaller = ref.current.scrollHeight < containerRef.current.clientHeight;
        return isWidthSmaller || isHeightSmaller;
      });

      // If the container is larger, reset the text and restart expansion
      if (isContainerLarger) {
        text = ""; // Reset the text
        setDisplayText(text); // Update the state
        textRefs.forEach(ref => {
          if (ref.current) ref.current.textContent = text; // Reset the displayed text
        });
      }

      // Restart the expansion process
      startExpansion();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
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