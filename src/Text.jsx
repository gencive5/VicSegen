import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("A");
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = ["font-myriad", "font-mutlu", "font-sword"];

  useEffect(() => {
    let text = "A";
    const interval = setInterval(() => {
      if (!containerRef.current || textRefs.some(ref => !ref.current)) return;

      // Temporarily add a character to test if it will overflow
      textRefs.forEach(ref => {
        ref.current.textContent = text + "A";
      });

      // Check if ANY of the fonts overflow the container
      const isOverflowing = textRefs.some(ref => {
        const isWidthOverflowing = ref.current.scrollWidth > containerRef.current.clientWidth;
        const isHeightOverflowing = ref.current.scrollHeight > containerRef.current.clientHeight;
        return isWidthOverflowing || isHeightOverflowing;
      });

      if (isOverflowing) {
        // If ANY font overflows, revert to the last valid text for ALL fonts
        textRefs.forEach(ref => {
          ref.current.textContent = text;
        });
        clearInterval(interval);
        return;
      }

      // If no overflow, permanently add the character
      text += "A";
      setDisplayText(text);
    }, 50);

    return () => clearInterval(interval);
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