import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("");
  const [fontStyle, setFontStyle] = useState("arial5"); // Default font style is now "arial5"
  const [matrixEffect, setMatrixEffect] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstSm00chClick, setIsFirstSm00chClick] = useState(true); // Track first sm00ch click
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
      }, 2100);
    }
    return () => clearInterval(interval);
  }, [matrixEffect, fontStyle]);

  useEffect(() => {
    const loadFontsAndSetText = async () => {
      try {
        // Preload sm00ch font on mobile
        if (isMobile && fontStyle === "sm00ch") {
          const font = new FontFace("font-sm00ch", "url(/path/to/sm00ch.woff2)");
          await font.load();
          document.fonts.add(font);
        }

        // Wait for fonts to load
        await document.fonts.ready;
        setFontsLoaded(true);

        // Set the initial text after fonts are loaded
        const finalText = preloadExpansion();
        setDisplayText(finalText);

        // Force a re-render on first sm00ch click
        if (isMobile && fontStyle === "sm00ch" && isFirstSm00chClick) {
          setTimeout(() => {
            setDisplayText(preloadExpansion()); // Recalculate and set text
            setIsFirstSm00chClick(false); // Mark first click as done
          }, 100); // Short delay to ensure font is applied
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
  }, [fontStyle, isMobile, isFirstSm00chClick]);

  const handleSm00chClick = () => {
    setFontStyle("sm00ch");
    if (isFirstSm00chClick) {
      setIsFirstSm00chClick(false); // Mark first click as done
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative pointer-events-auto"
    >
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-2 sm:gap-4 z-50"> 
        <button
          onClick={() => setFontStyle("arial5")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
        >
          Arial5
        </button>
        <button
          onClick={() => setFontStyle("triple")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
        >
          rat portfolio
        </button>
       <button
          onClick={handleSm00chClick} // Use custom handler for sm00ch
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
        >
          Sm00ch
        </button>
        <button
          onClick={() => setMatrixEffect((prev) => !prev)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
        >
          {matrixEffect ? "Stop Matrix" : "Start Matrix"}
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