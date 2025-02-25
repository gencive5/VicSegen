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

        if (textHeight < containerHeight) {
          // Keep adding "i" to the text
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex items-center justify-center p-4 overflow-hidden"
    >
      <p
        ref={textRef}
        className="text-[10vw] font-bold leading-none text-center break-words"
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
      >
        {text}
      </p>
    </div>
  );
}
