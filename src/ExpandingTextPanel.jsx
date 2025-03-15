import { useEffect, useRef, useState } from "react";
import ExpandingHi from "./ExpandingHi"; // Import the new "Hi" component

export default function ExpandingTextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef(null);
  const textRef = useRef(null);

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

    const fillTextToSize = () => {
      if (!containerRef.current || !textRef.current) return;

      let testText = "";
      let step = 10; // Start with a larger step for speed
      let fits = false;

      const updateText = () => {
        if (!containerRef.current || !textRef.current) return;
        textRef.current.textContent = testText;

        const overflows =
          textRef.current.scrollWidth > containerRef.current.clientWidth ||
          textRef.current.scrollHeight > containerRef.current.clientHeight;

        if (overflows) {
          // Remove last addition and decrease step size for precision
          testText = testText.slice(0, -step);
          step = Math.max(1, Math.floor(step / 2)); // Reduce step but keep at least 1

          if (step === 1) {
            fits = true; // Stop refining when step size is 1
          }
        } else {
          // If there's still space, add more characters
          testText += generateRandomText(step);
        }

        if (!fits) {
          requestAnimationFrame(updateText); // Continue refining
        } else {
          setDisplayText(testText); // Finalize the text
        }
      };

      updateText();
    };

    fillTextToSize();

    // Handle window resize dynamically
    const handleResize = () => {
      setDisplayText(""); // Clear before recalculating
      requestAnimationFrame(fillTextToSize);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden relative pointer-events-auto">
      {text === "Hi" ? (
        <ExpandingHi />
      ) : text === "" ? (
        // SPECIAL TRIPLE FONT EFFECT FOR "RAT PORTFOLIO"
        <div className="relative w-full h-full z-5">
          <p
            ref={textRef}
            className="text-[9vw] font-myriad leading-none text-left break-words text-naranja"
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
            className="text-[9vw] font-mutlu leading-none text-left break-words text-bleu"
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
            className="text-[9vw] font-sword leading-none text-left break-words text-rose"
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
