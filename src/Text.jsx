import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("");
  const [fontStyle, setFontStyle] = useState("arial5"); // Default font style is now "arial5"
  const [matrixEffect, setMatrixEffect] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstSm00chRender, setIsFirstSm00chRender] = useState(true); // Track first render for sm00ch
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"],
    arial5: ["font-arial5", "font-arial5", "font-arial5"],
    sm00ch: ["font-sm00ch", "font-sm00ch", "font-sm00ch"],
  };

  useEffect(() => {
    // Detect if the user is on a mobile device
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
    setIsMobile(mobile);
  }, []);

  const getRandomLetter = () => {
    if (fontStyle === "arial5") {
      const characters = ["5", "s", "S"];
      return characters[Math.floor(Math.random() * characters.length)];
    } else if (fontStyle === "triple") {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    } else {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  };

  const checkOverflow = (text) => {
    return textRefs.some((ref) => {
      if (!ref.current || !containerRef.current) return false;
      ref.current.textContent = text;
      const isWidthOverflowing = ref.current.scrollWidth > containerRef.current.clientWidth;
      const isHeightOverflowing = ref.current.scrollHeight > containerRef.current.clientHeight;
      return isWidthOverflowing || isHeightOverflowing;
    });
  };

  const preloadExpansion = () => {
    let text = "";
    while (true) {
      const randomLetter = getRandomLetter();
      const newText = text + randomLetter;

      if (checkOverflow(newText)) {
        break;
      }

      text = newText;
    }
    return text;
  };

  const randomizeLetters = (text) => {
    const textArray = text.split("");
    const numberOfChanges = 1;
    for (let i = 0; i < numberOfChanges; i++) {
      const randomIndex = Math.floor(Math.random() * textArray.length);
      textArray[randomIndex] = getRandomLetter();
    }
    return textArray.join("");
  };

  useEffect(() => {
    let interval;
    if (matrixEffect) {
      interval = setInterval(() => {
        setDisplayText((prevText) => randomizeLetters(prevText));
      }, 600);
    }
    return () => clearInterval(interval);
  }, [matrixEffect, fontStyle]);

  useEffect(() => {
    const loadFontsAndSetText = async () => {
      try {
        // Wait for fonts to load
        await document.fonts.ready;
        setFontsLoaded(true);

        // Set the initial text after fonts are loaded
        const finalText = preloadExpansion();
        setDisplayText(finalText);

        // Force a re-render for sm00ch on mobile to simulate the second load
        if (isMobile && fontStyle === "sm00ch" && isFirstSm00chRender) {
          setTimeout(() => {
            setDisplayText(preloadExpansion()); // Recalculate and set text
            setIsFirstSm00chRender(false); // Mark first render as done
          }, 100); // Short delay to ensure the first render completes
        }
      } catch (error) {
        console.error("Error loading fonts:", error);
        // Fallback: Set fontsLoaded to true even if fonts fail to load
        setFontsLoaded(true);

        // Set the initial text even if fonts fail to load
        const finalText = preloadExpansion();
        setDisplayText(finalText);
      }
    };

    loadFontsAndSetText();

    const handleResize = () => {
      const newFinalText = preloadExpansion();
      setDisplayText(newFinalText);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fontStyle, isMobile, isFirstSm00chRender]);

  const handleSm00chClick = () => {
    setFontStyle("sm00ch");
    setIsFirstSm00chRender(true); // Reset first render state when sm00ch is clicked
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative pointer-events-auto"
    >
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col z-50 sm:flex-row sm:bottom-5 sm:gap-4">
        <button
          onClick={() => setFontStyle("arial5")}
          className="custom-button bg-arial5-button mb-[-8px]"
          style={{ width: "200px", height: "100px" }} // Adjust based on your PNG aspect ratio
        >
          <span className="button-text">gencive5</span>
        </button>
        <button
          onClick={() => setFontStyle("triple")}
          className="custom-button bg-triple-button mb-[-8px]"
          style={{ width: "200px", height: "100px" }} // Adjust based on your PNG aspect ratio
        >
         <span className="button-text" >rat portfolio</span>
         </button>
        <button
          onClick={handleSm00chClick}
          className="custom-button bg-sm00ch-button mb-[-8px]"
          style={{ width: "200px", height: "100px" }} // Adjust based on your PNG aspect ratio
        >
          <span className="button-text">Sm00ch</span>
        </button>
        <button
          onClick={() => setMatrixEffect((prev) => !prev)}
          className="custom-button bg-matrix-button"
        >
          <span>{matrixEffect ? "Stop Matrix" : "Start Matrix"}</span>
        </button>
      </div>

      {textRefs.map((ref, index) => (
        <p
          key={index}
          ref={ref}
          className={`${
            fontStyle === "sm00ch" ? "text-[14vw] sm:text-[9vw]" : "text-[12vw] sm:text-[9vw]"
          } font-bold leading-none text-left break-words z-0 ${fonts[fontStyle][index]}`} 
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
            visibility: fontsLoaded ? "visible" : "hidden", // Hide text until fonts are loaded
          }}
        >
          {displayText}
        </p>
      ))}
    </div>
  );
}