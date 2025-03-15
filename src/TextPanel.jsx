import { useEffect, useState, useRef } from "react";
import ExpandingHi from "./ExpandingHi";

export default function TextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef(null);
  const textRefs = useRef([]); // Store refs for all 3 text layers

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

    const fillText = () => {
      if (!containerRef.current || textRefs.current.length === 0) return;

      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 768;
      const baseFontSize = isMobile ? 12 : 9; // 12vw for mobile, 9vw for desktop

      let initialLength = 1000;
      let randomText = generateRandomText(initialLength);

      // Temporarily set text to measure height
      textRefs.current[0].textContent = randomText;
      let textHeight = textRefs.current[0].scrollHeight;
      const containerHeight = containerRef.current.clientHeight;

      // Trim text dynamically to fit within the container
      while (textHeight > containerHeight && randomText.length > 0) {
        randomText = randomText.slice(0, -1); // Remove last character
        textRefs.current[0].textContent = randomText;
        textHeight = textRefs.current[0].scrollHeight;
      }

      setDisplayText(randomText);

      // Apply the same font size to all 3 text layers
      textRefs.current.forEach((ref) => {
        if (ref) ref.style.fontSize = `${baseFontSize}vw`;
      });
    };

    fillText();
    window.addEventListener("resize", fillText);

    return () => window.removeEventListener("resize", fillText);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 pb-12 overflow-hidden relative flex items-center justify-center z-5">
      {text === "Hi" ? (
        <ExpandingHi />
      ) : text === "" ? (
        <div className="relative w-full h-full">
          {["myriad text-naranja", "mutlu text-bleu", "sword text-rose"].map((fontClass, index) => (
            <p
              key={index}
              ref={(el) => (textRefs.current[index] = el)} // Assign ref dynamically to all layers
              className={`absolute text-center font-${fontClass} leading-none`}
              style={{
                fontSize: "9vw", // Default desktop font size
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
          ref={(el) => (textRefs.current[0] = el)} // Single text case
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
