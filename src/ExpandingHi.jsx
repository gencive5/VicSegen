import { useEffect, useState, useRef } from "react";

export default function ExpandingHi() {
  const [displayText, setDisplayText] = useState("H");
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let text = "H";
    const interval = setInterval(() => {
      if (!containerRef.current || !textRef.current) return;

      // Temporarily add an "i" to test if it will overflow
      textRef.current.textContent = text + "i";

      // Check if adding the "i" will cause overflow
      const isOverflowing =
        textRef.current.scrollWidth > containerRef.current.clientWidth ||
        textRef.current.scrollHeight > containerRef.current.clientHeight;

      if (isOverflowing) {
        textRef.current.textContent = text; // Revert to the last valid text
        clearInterval(interval);
        return;
      }

      // If no overflow, permanently add the "i"
      text += "i";
      setDisplayText(text);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full p-6 p-6 md:p-2 overflow-hidden relative pointer-events-auto">
      <p
        ref={textRef}
        className="text-[9vw] font-bold leading-none text-left break-words z-0"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
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
  );
}
