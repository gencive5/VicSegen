import { useState, useEffect, useRef } from "react";

export default function ExpandingTextPanel({ textConfig, showLink, link }) {
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

        // Define a weighted random function for '5', 's', or 'S'
        const getRandomGencive5Char = () => {
          const rand = Math.random();
          if (rand < 0.6) return '5'; // 60% chance for '5'
          else if (rand < 0.85) return 's'; // 25% chance for 's'
          else return 'S'; // 15% chance for 'S'
        };

        // Define a function for random characters for sm00ch
        const getRandomSm00chChar = () => {
          const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
          return chars.charAt(Math.floor(Math.random() * chars.length));
        };

        // Choose character based on current text
        let nextChar = "i";  // Default character
        if (text === "55555555s5555SSSssss555555") {
          nextChar = getRandomGencive5Char();
        } else if (text === "sm00ch") {
          nextChar = getRandomSm00chChar();
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

      {/* Conditional link rendering with URL as text */}
      {showLink && link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline mt-2 block relative z-100 pointer-events-auto"
        >
          {link}
        </a>
      )}
    </div>
  );
}
