// ExpandingTextPanel.jsx
import { useState, useEffect, useRef } from "react";

export default function ExpandingTextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [expandedText, setExpandedText] = useState(text);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // Update expandedText when textConfig.text changes
  useEffect(() => {
    setExpandedText(text);  // Reset to the new text
  }, [text]);

  useEffect(() => {
    const updateText = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const textWidth = textRef.current.scrollWidth;
        const textHeight = textRef.current.scrollHeight;

        // Check if adding "i" would cause overflow
        const testText = expandedText + "i";
        textRef.current.textContent = testText;
        const newWidth = textRef.current.scrollWidth;
        const newHeight = textRef.current.scrollHeight;

        // Restore the original text
        textRef.current.textContent = expandedText;

        // Only update state if it doesn't cause overflow
        if (newWidth <= containerWidth && newHeight <= containerHeight) {
          setExpandedText((prev) => prev + "i");
        }
      }
    };

    const interval = setInterval(updateText, 50);
    window.addEventListener("resize", updateText);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateText);
    };
  }, [expandedText]);  // Depend on expandedText instead of text

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-0">
        <p
          ref={textRef}
          className={`text-[9vw] ${font} leading-none text-left break-words`}
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
      </div>
    </div>
  );
}
