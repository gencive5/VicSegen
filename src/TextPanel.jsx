import { useEffect, useState, useRef } from "react";
import ExpandingHi from "./ExpandingHi";

export default function TextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef(null);
  const textRef = useRef(null);

  function generateRandomText(length) {
    const chars =
      text === "5"
        ? "555ssssSS"
        : text === "sm00ch"
        ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
        : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
  }

  useEffect(() => {
    if (text === "Hi") return; // Skip for ExpandingHi component
    if (!containerRef.current || !textRef.current) return;

    let min = 10; // Start with a reasonable minimum
    let max = 5000; // Limit the max length for performance
    let bestFitText = "";

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      const testText = generateRandomText(mid);
      textRef.current.textContent = testText;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const textWidth = textRef.current.scrollWidth;
      const textHeight = textRef.current.scrollHeight;

      if (textWidth <= containerWidth && textHeight <= containerHeight) {
        bestFitText = testText; // Store best fit
        min = mid + 10; // Increase text size in bigger steps for speed
      } else {
        max = mid - 10; // Reduce text size in bigger steps
      }
    }

    setDisplayText(bestFitText);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden relative flex items-center justify-center">
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
          }}
        >
          {displayText}
        </p>
      )}
    </div>
  );
}
