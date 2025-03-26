import { useEffect, useState, useRef } from "react";

export default function ExpandingHi() {
  const [displayText, setDisplayText] = useState("H");
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await document.fonts.ready;
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;
    
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
    }, 10);

    return () => clearInterval(interval);
  }, [fontsLoaded]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden relative pointer-events-auto p-4 md:p-6">
      <p
        ref={textRef}
        className="text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words z-0 font-arial5"
        style={{
          position: "absolute",
          top: "1.6rem",
          left: "1.6rem",
          right: "1.6rem",
          bottom: "1.6rem",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          maxWidth: "100%",
          maxHeight: "100%",
          lineHeight: 1,
          letterSpacing: "0",
          visibility: fontsLoaded ? "visible" : "hidden",
        }}
      >
        {displayText}
      </p>
    </div>
  );
}