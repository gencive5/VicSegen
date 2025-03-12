import { useState, useEffect, useRef } from "react";

export default function ExpandingTextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [expandedText, setExpandedText] = useState(text);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // Update expandedText when textConfig.text changes
  useEffect(() => {
    setExpandedText(text); // Reset to the new text
  }, [text]);

  useEffect(() => {
    const updateText = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        // Random char generators
        const getRandomGencive5Char = () => {
          const rand = Math.random();
          if (rand < 0.6) return '5';
          else if (rand < 0.85) return 's';
          else return 'S';
        };

        const getRandomSm00chChar = () => {
          const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
          return chars.charAt(Math.floor(Math.random() * chars.length));
        };

        const getRandomRatChar = () => {
          const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          return chars.charAt(Math.floor(Math.random() * chars.length));
        };

        // Choose character based on current text
        let nextChar = "i";
        if (text === "5") {
          nextChar = getRandomGencive5Char();
        } else if (text === "sm00ch") {
          nextChar = getRandomSm00chChar();
        } else if (text === "") {
          nextChar = getRandomRatChar();
        }

        const testText = expandedText + nextChar;
        textRef.current.textContent = testText;
        const newWidth = textRef.current.scrollWidth;
        const newHeight = textRef.current.scrollHeight;

        textRef.current.textContent = expandedText;

        if (newWidth <= containerWidth && newHeight <= containerHeight) {
          setExpandedText((prev) => prev + nextChar);
        }
      }
    };

    const interval = setInterval(updateText, 50);
    window.addEventListener("resize", updateText);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateText);
    };
  }, [expandedText, text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden relative pointer-events-auto">
      {text === "" ? (
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
            {expandedText}
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
            {expandedText}
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
            {expandedText}
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
          {expandedText}
        </p>
      )}
    </div>
  );
}
