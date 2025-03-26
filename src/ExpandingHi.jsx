import { useEffect, useRef, useState } from "react";

export default function ExpandingHi() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const loadFonts = async () => {
      await document.fonts.ready;
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontsLoaded || !containerRef.current || !textRef.current) return;

    const calculateMaxText = () => {
      let text = "H";
      while (true) {
        textRef.current.textContent = text + "i";
        const isOverflowing =
          textRef.current.scrollWidth > containerRef.current.clientWidth ||
          textRef.current.scrollHeight > containerRef.current.clientHeight;
        
        if (isOverflowing) {
          textRef.current.textContent = text;
          break;
        }
        text += "i";
      }
      return text;
    };

    setDisplayText(calculateMaxText());

    const handleResize = () => {
      setDisplayText(calculateMaxText());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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