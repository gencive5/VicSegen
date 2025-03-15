import { useEffect, useState, useRef } from "react";
import ExpandingHi from "./ExpandingHi";

export default function TextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const generateRandomText = (length) => {
    const chars =
      text === "5"
        ? "555ssssSS"
        : text === "sm00ch"
        ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
        : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
  };

  useEffect(() => {
    if (text === "Hi") return; // Skip for ExpandingHi component

    // Function to resize and fill the container with random text
    const fillText = () => {
      if (!containerRef.current || !textRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // Start with a reasonable random text length (1,000 characters)
      const initialLength = 1000; // You can adjust this for more/less randomness
      const randomText = generateRandomText(initialLength);

      // Set the text
      textRef.current.textContent = randomText;

      // Set the font size to fill the container (based on viewport width)
      let fontSize = Math.min(containerWidth / randomText.length, 9); // Max font size 9vw (or adjust to your needs)
      fontSize = fontSize > 9 ? fontSize : 9; // Ensuring at least 9vw font size

      setDisplayText(randomText); // Update the display text for rendering

      // Apply the font size directly to the text
      textRef.current.style.fontSize = `${fontSize}vw`;
    };

    fillText(); // Call initially

    // Recalculate text when window is resized
    const handleResize = () => {
      fillText();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden relative flex items-center justify-center z-5">
      {text === "Hi" ? (
        <ExpandingHi />
      ) : text === "" ? (
        <div className="relative w-full h-full">
          {["myriad text-naranja", "mutlu text-bleu", "sword text-rose"].map((fontClass, index) => (
            <p
              key={index}
              ref={index === 0 ? textRef : null} // Only measure the first layer
              className={`absolute text-center font-${fontClass} leading-none`}
              style={{
                fontSize: "9vw",
                transform: index === 0 ? "translate(2px, 2px)" : index === 1 ? "translate(-2px, -2px)" : "none",
                zIndex: index + 1,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              {displayText}
            </p>
          ))}
        </div>
      ) : (
        <p
          ref={textRef}
          className={`text-[9vw] leading-none text-center break-words z-50 ${font}`}
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
            maxHeight: "100%",
            visibility: "visible",
          }}
        >
          {displayText}
        </p>
      )}
    </div>
  );
}
