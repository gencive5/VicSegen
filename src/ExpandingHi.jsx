import { useEffect, useRef, useState } from "react";

export default function ExpandingHi() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  // Same font loading logic as Text.jsx
  useEffect(() => {
    const loadFonts = async () => {
      await document.fonts.ready;
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // Identical overflow checking logic from Text.jsx
  const checkOverflow = (text) => {
    if (!textRef.current || !containerRef.current) return false;
    textRef.current.textContent = text;
    return (
      textRef.current.scrollWidth > containerRef.current.clientWidth || 
      textRef.current.scrollHeight > containerRef.current.clientHeight
    );
  };

  // Modified preloadExpansion to use "Hiii..." instead of random letters
  const preloadExpansion = () => {
    let text = "H";
    while (true) {
      const newText = text + "i";
      if (checkOverflow(newText)) break;
      text = newText;
    }
    return text;
  };

  // Same resize and font loading behavior as Text.jsx
  useEffect(() => {
    if (!fontsLoaded) return;

    const updateText = () => {
      setDisplayText(preloadExpansion());
    };

    updateText();
    const resizeHandler = () => updateText();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
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