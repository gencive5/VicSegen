import { useEffect, useRef, useState } from "react";

export default function ExpandingHi() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  // Enhanced font loading with preload check
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Wait for fonts AND an additional frame to ensure layout stability
        await document.fonts.ready;
        await new Promise(requestAnimationFrame);
        setFontsLoaded(true);
      } catch (e) {
        console.error("Font loading error:", e);
        setFontsLoaded(true); // Fallback
      }
    };
    loadFonts();
  }, []);

  // Sm00ch-style expansion logic with multi-pass checking
  const calculateMaxText = () => {
    if (!textRef.current || !containerRef.current) return "H";
    
    // Reset to basic text first
    textRef.current.textContent = "H";
    let text = "H";
    
    // Phase 1: Fast expansion in chunks
    while (text.length < 1000) { // Safety limit
      const testText = text + "iiiiiiiiii"; // Add 10 i's at a time
      textRef.current.textContent = testText;
      
      if (textRef.current.scrollWidth > containerRef.current.clientWidth || 
          textRef.current.scrollHeight > containerRef.current.clientHeight) {
        break;
      }
      text = testText;
    }
    
    // Phase 2: Precise single-character adjustment
    while (true) {
      const testText = text + "i";
      textRef.current.textContent = testText;
      
      if (textRef.current.scrollWidth > containerRef.current.clientWidth || 
          textRef.current.scrollHeight > containerRef.current.clientHeight) {
        textRef.current.textContent = text; // Revert to last good state
        break;
      }
      text = testText;
    }
    
    return text;
  };

  // Enhanced resize handler with debounce
  useEffect(() => {
    if (!fontsLoaded) return;

    let timeoutId;
    const updateText = () => {
      setDisplayText(calculateMaxText());
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateText, 100);
    };

    updateText(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
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
          // Sm00ch-style rendering enhancements
          willChange: "contents",
          backfaceVisibility: "hidden",
          transform: "translate3d(0,0,0)"
        }}
      >
        {displayText}
      </p>
    </div>
  );
}