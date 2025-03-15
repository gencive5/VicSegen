import { useEffect, useRef, useState } from "react";
import ExpandingHi from "./ExpandingHi";

export default function ExpandingTextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [displayText, setDisplayText] = useState("");
  const [isTextReady, setIsTextReady] = useState(false);
  const containerRef = useRef(null);
  const hiddenMeasureRef = useRef(null);

  useEffect(() => {
    if (text === "Hi") return; // Skip if using ExpandingHi component

    const generateRandomText = (length) => {
      let result = "";
      const chars =
        text === "5"
          ? "555ssssSS"
          : text === "sm00ch"
          ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
          : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const fillTextToViewport = () => {
      if (!containerRef.current || !hiddenMeasureRef.current) return;

      let min = 1;
      let max = 10000; // Large upper limit for text length
      let bestFitText = "";

      while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        const testText = generateRandomText(mid);
        hiddenMeasureRef.current.textContent = testText;

        const containerBounds = containerRef.current.getBoundingClientRect();
        const textBounds = hiddenMeasureRef.current.getBoundingClientRect();

        if (textBounds.width <= containerBounds.width && textBounds.height <= containerBounds.height) {
          bestFitText = testText; // Keep this as the best fit so far
          min = mid + 1; // Try adding more text
        } else {
          max = mid - 1; // Reduce text size
        }
      }

      setDisplayText(bestFitText);
      setIsTextReady(true);
    };

    fillTextToViewport();

    const handleResize = () => {
      setIsTextReady(false);
      requestAnimationFrame(fillTextToViewport);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden relative pointer-events-auto">
      {/* Hidden element for measuring text */}
      <p ref={hiddenMeasureRef} className="absolute invisible text-[9vw]">
        {displayText}
      </p>

      {text === "Hi" ? (
        <ExpandingHi />
      ) : text === "" ? (
        <div className="relative w-full h-full z-5">
          {["myriad text-naranja", "mutlu text-bleu", "sword text-rose"].map((fontClass, index) => (
            <p
              key={index}
              className={`text-[9vw] font-${fontClass} leading-none absolute top-0 left-0 break-words`}
              style={{
                transform: index === 0 ? "translate(2px, 2px)" : index === 1 ? "translate(-2px, -2px)" : "none",
                zIndex: index + 1,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxWidth: "100%",
                maxHeight: "100%",
                visibility: isTextReady ? "visible" : "hidden",
              }}
            >
              {displayText}
            </p>
          ))}
        </div>
      ) : (
        <p
          className={`text-[9vw] ${font} leading-none text-left break-words z-50`}
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
            maxHeight: "100%",
            visibility: isTextReady ? "visible" : "hidden",
          }}
        >
          {displayText}
        </p>
      )}
    </div>
  );
}
