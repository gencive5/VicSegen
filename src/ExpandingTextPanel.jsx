import { useEffect, useRef, useState } from "react";
import ExpandingHi from "./ExpandingHi"; // Import the new "Hi" component

export default function ExpandingTextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (text === "Hi") {
      return; // "Hi" is handled by ExpandingHi component
    }

    // Generate a full block of random text at once
    const generateRandomText = (length) => {
      let result = "";
      if (text === "5") {
        const chars = "555ssssSS";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      } else if (text === "sm00ch") {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      } else {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      }
      return result;
    };

    // Fill text to match size of "Hi" expanding version
    const fillTextToSize = () => {
      if (!containerRef.current || !textRef.current) return;

      let testText = "";
      let maxChars = 50; // Adjust to control size
      while (
        textRef.current.scrollWidth < containerRef.current.clientWidth &&
        textRef.current.scrollHeight < containerRef.current.clientHeight &&
        testText.length < maxChars
      ) {
        testText = generateRandomText(testText.length + 5);
        textRef.current.textContent = testText;
      }
      setDisplayText(testText);
    };

    fillTextToSize();
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden relative pointer-events-auto">
      {text === "Hi" ? (
        <ExpandingHi /> // Use the separate component for expanding "Hi"
      ) : text === "" ? (
        // SPECIAL TRIPLE FONT EFFECT FOR "RAT PORTFOLIO"
        <div className="relative w-full h-full z-5">
          <p
            ref={textRef}
            className={`text-[9vw] font-myriad leading-none text-left break-words text-naranja`}
            style={{
              transform: "translate(2px, 2px)",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            {displayText}
          </p>
          <p
            className={`text-[9vw] font-mutlu leading-none text-left break-words text-bleu`}
            style={{
              transform: "translate(-2px, -2px)",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            {displayText}
          </p>
          <p
            className={`text-[9vw] font-sword leading-none text-left break-words text-rose`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 3,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            {displayText}
          </p>
        </div>
      ) : (
        <p
          ref={textRef}
          className={`text-[9vw] ${font} leading-none text-left break-words z-50`}
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
