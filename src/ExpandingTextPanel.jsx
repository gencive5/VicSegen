import { useState, useEffect, useRef } from "react";

export default function ExpandingTextPanel() {
  const [text, setText] = useState("Hi");
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const updateText = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const textWidth = textRef.current.scrollWidth;
        const textHeight = textRef.current.scrollHeight;

        // Temporarily add an "i" to test if it would overflow
        textRef.current.textContent = text + "i";
        const newWidth = textRef.current.scrollWidth;
        const newHeight = textRef.current.scrollHeight;

        // Restore the original text
        textRef.current.textContent = text;

        // Only add "i" if it DOESN'T cause overflow
        if (newWidth <= containerWidth && newHeight <= containerHeight) {
          setText((prev) => prev + "i");
        }
      }
    };

    const interval = setInterval(updateText, 50);
    window.addEventListener("resize", updateText);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateText);
    };
  }, [text]); // Depend on text so it updates dynamically

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-0">
        <p
          ref={textRef}
          className="text-[9vw] font-bold leading-none text-left break-words"
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
