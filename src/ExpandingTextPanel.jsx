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

        if (textWidth <= containerWidth - 20 && textHeight <= containerHeight - 20) {
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
      className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 p-10"
    >
      <p
        ref={textRef}
        className="text-[9vw] font-bold leading-none text-left break-words"
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          maxWidth: "calc(100% - 20px)",
          maxHeight: "calc(100% - 20px)",
        }}
      >
        {text}
      </p>
    </div>
  );
}
