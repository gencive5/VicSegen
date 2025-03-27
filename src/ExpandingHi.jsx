import { useEffect, useRef, useState } from "react";

export default function ExpandingHi() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  // 1:1 copy of arial5's font loading logic
  useEffect(() => {
    let isMounted = true;
    const loadFonts = async () => {
      try {
        // Arial5's exact font readiness sequence
        await document.fonts.ready;
        await new Promise(resolve => setTimeout(resolve, 50));
        if (isMounted) setFontsLoaded(true);
      } catch (e) {
        console.error("Font loading error:", e);
        if (isMounted) setFontsLoaded(true);
      }
    };
    loadFonts();
    return () => { isMounted = false; };
  }, []);

  // Direct clone of arial5's text expansion algorithm
  const calculateMaxText = () => {
    if (!textRef.current || !containerRef.current) return "H";
    
    // Arial5's exact measurement approach
    textRef.current.style.visibility = 'hidden';
    textRef.current.textContent = "H";
    const container = containerRef.current;
    
    let text = "H";
    let safety = 0;
    const maxIterations = 500; // Same as arial5's limit
    
    // Phase 1: Bulk expansion (identical to arial5)
    while (safety++ < maxIterations) {
      const testText = text + "iiii"; // Same chunk size as arial5 uses
      textRef.current.textContent = testText;
      
      if (textRef.current.scrollWidth > container.clientWidth || 
          textRef.current.scrollHeight > container.clientHeight) {
        break;
      }
      text = testText;
    }
    
    // Phase 2: Precise adjustment (arial5's exact method)
    while (safety++ < maxIterations) {
      const testText = text + "i";
      textRef.current.textContent = testText;
      
      if (textRef.current.scrollWidth > container.clientWidth || 
          textRef.current.scrollHeight > container.clientHeight) {
        textRef.current.textContent = text;
        break;
      }
      text = testText;
    }
    
    textRef.current.style.visibility = fontsLoaded ? 'visible' : 'hidden';
    return text;
  };

  // Exact copy of arial5's resize handling
  useEffect(() => {
    if (!fontsLoaded) return;

    let resizeTimeout;
    const updateText = () => {
      setDisplayText(calculateMaxText());
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateText, 150); // Arial5's debounce timing
    };

    // Arial5's initialization delay
    const initTimeout = setTimeout(() => {
      updateText();
      window.addEventListener('resize', handleResize);
    }, 200);

    return () => {
      clearTimeout(resizeTimeout);
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
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
          // Arial5's exact rendering properties
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        {displayText}
      </p>
    </div>
  );
}