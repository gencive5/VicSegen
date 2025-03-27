import { useEffect, useRef, useState } from "react";

export default function ExpandingHi() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState("");

<<<<<<< HEAD
  // Optimized measurement function
  const calculateMaxText = () => {
    if (!textRef.current || !containerRef.current) return "H";
    
    // Save original state
    const originalStyle = {
      position: textRef.current.style.position,
      visibility: textRef.current.style.visibility,
      opacity: textRef.current.style.opacity
    };

    // Set measurement state
    textRef.current.style.position = 'absolute';
    textRef.current.style.visibility = 'hidden';
    textRef.current.style.opacity = '0';

    let text = "H";
    textRef.current.textContent = text;

    // Bulk expansion (4 i's at a time)
    while (text.length < 500) {
      const testText = text + "iiii";
      textRef.current.textContent = testText;
      
      if (textRef.current.scrollWidth > containerRef.current.clientWidth || 
          textRef.current.scrollHeight > containerRef.current.clientHeight) {
        break;
      }
      text = testText;
    }

    // Precise adjustment
    while (text.length < 1000) {
      const testText = text + "i";
      textRef.current.textContent = testText;
      
      if (textRef.current.scrollWidth > containerRef.current.clientWidth || 
          textRef.current.scrollHeight > containerRef.current.clientHeight) {
        break;
      }
      text = testText;
    }

    // Restore original state
    Object.assign(textRef.current.style, originalStyle);
    return text;
  };

  // Robust initialization
=======
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
>>>>>>> parent of d9a685b (test better expansion hiii mobile)
  useEffect(() => {
    let mounted = true;
    let rafId;
    let resizeObserver;

    const updateText = () => {
<<<<<<< HEAD
      if (mounted) {
        setDisplayText(calculateMaxText());
      }
    };

    // Wait for fonts and initial layout
    const init = async () => {
      await document.fonts.ready;
      await new Promise(resolve => requestAnimationFrame(resolve));
      updateText();

      // Modern resize observer instead of resize event
      if (containerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(updateText);
        });
        resizeObserver.observe(containerRef.current);
      }
    };

    init();
    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);
=======
      setDisplayText(preloadExpansion());
    };

    updateText();
    const resizeHandler = () => updateText();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fontsLoaded]);
>>>>>>> parent of d9a685b (test better expansion hiii mobile)

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
<<<<<<< HEAD
          // Critical mobile rendering optimizations
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: "transform"
=======
          visibility: fontsLoaded ? "visible" : "hidden",
>>>>>>> parent of d9a685b (test better expansion hiii mobile)
        }}
      >
        {displayText}
      </p>
    </div>
  );
}