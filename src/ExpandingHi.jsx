import { useEffect, useRef, useState } from "react";

export default function ExpandingHi() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  // Sm00ch-style font loading with additional safeguards
  useEffect(() => {
    let mounted = true;
    const loadFonts = async () => {
      try {
        // Triple-check font readiness like sm00ch does
        await document.fonts.ready;
        await new Promise(resolve => setTimeout(resolve, 50));
        await new Promise(requestAnimationFrame);
        if (mounted) setFontsLoaded(true);
      } catch (e) {
        console.error("Font loading error:", e);
        if (mounted) setFontsLoaded(true); // Fallback
      }
    };
    
    loadFonts();
    return () => { mounted = false; };
  }, []);

  // Direct sm00ch mobile expansion algorithm
  const calculateMaxText = () => {
    if (!textRef.current || !containerRef.current) return "H";
    
    // Reset DOM state exactly like sm00ch does
    textRef.current.style.visibility = 'hidden';
    textRef.current.textContent = "H";
    
    let text = "H";
    let safety = 0;
    const maxIterations = 1000;
    
    // Mobile-optimized expansion pass
    const expandText = () => {
      while (safety++ < maxIterations) {
        const testText = text + "iiiiiiiiii"; // 10 i's at a time for mobile perf
        
        // Direct measurement like sm00ch
        textRef.current.textContent = testText;
        const { scrollWidth, scrollHeight } = textRef.current;
        const { clientWidth, clientHeight } = containerRef.current;
        
        if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
          break;
        }
        text = testText;
      }
      return text;
    };
    
    // Initial expansion
    text = expandText();
    
    // Mobile refinement pass (exact sm00ch technique)
    while (safety++ < maxIterations) {
      const testText = text + "i";
      textRef.current.textContent = testText;
      const { scrollWidth, scrollHeight } = textRef.current;
      const { clientWidth, clientHeight } = containerRef.current;
      
      if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
        textRef.current.textContent = text; // Revert
        break;
      }
      text = testText;
    }
    
    // Finalize like sm00ch
    textRef.current.style.visibility = fontsLoaded ? 'visible' : 'hidden';
    return text;
  };

  // Sm00ch's resize handler with mobile optimizations
  useEffect(() => {
    if (!fontsLoaded) return;

    let resizeTimeout;
    let frameId;
    let needsUpdate = true;

    const updateText = () => {
      if (needsUpdate) {
        setDisplayText(calculateMaxText());
        needsUpdate = false;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(frameId);
      needsUpdate = true;
      resizeTimeout = setTimeout(() => {
        frameId = requestAnimationFrame(updateText);
      }, 100); // Sm00ch's mobile debounce timing
    };

    // Initial calculation with mobile-safe timing
    const initTimeout = setTimeout(() => {
      updateText();
      window.addEventListener('resize', handleResize);
    }, 300); // Additional mobile delay like sm00ch

    return () => {
      clearTimeout(resizeTimeout);
      clearTimeout(initTimeout);
      cancelAnimationFrame(frameId);
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
          // Critical sm00ch mobile rendering properties
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased"
        }}
      >
        {displayText}
      </p>
    </div>
  );
}