import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("Loading...");
  const [fontStyle, setFontStyle] = useState("arial5");
  const [matrixEffect, setMatrixEffect] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [arial5Lines, setArial5Lines] = useState(0);
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)]; // Keep multiple refs for triple font

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"], // Array for triple font
    arial5: "font-arial5", // Single string for arial5
    sm00ch: "font-sm00ch", // Single string for sm00ch
  };

  // Detect if the user is on a mobile device
  useEffect(() => {
    const mobileCheck = /iphone|ipad|ipod|android|blackberry|windows phone/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

  const getRandomLetter = () => {
    if (fontStyle === "arial5") {
      return ["5", "s", "S"][Math.floor(Math.random() * 3)];
    } else if (fontStyle === "triple") {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    } else {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  };

  const checkOverflow = (text) => {
    // Use the first ref for overflow checking
    if (!textRefs[0].current || !containerRef.current) return false;
    textRefs[0].current.textContent = text;
    return textRefs[0].current.scrollWidth > containerRef.current.clientWidth || 
           textRefs[0].current.scrollHeight > containerRef.current.clientHeight;
  };

  const preloadExpansion = () => {
    let text = "";
    while (true) {
      const newText = text + getRandomLetter();
      if (checkOverflow(newText)) break;
      text = newText;
    }
    return text;
  };

  // Calculate the number of lines for arial5
  const calculateArial5Lines = () => {
    if (!containerRef.current || !textRefs[0].current) return 0;

    // Temporarily set the font to arial5 and calculate the number of lines
    textRefs[0].current.style.fontFamily = "arial5";
    textRefs[0].current.textContent = displayText;

    const lineHeight = parseFloat(window.getComputedStyle(textRefs[0].current).lineHeight);
    const textHeight = textRefs[0].current.scrollHeight;

    const lines = Math.floor(textHeight / lineHeight);
    return lines;
  };

  useEffect(() => {
    let interval;
    if (matrixEffect) {
      interval = setInterval(() => {
        setDisplayText((prevText) => {
          const textArray = prevText.split("");
          textArray[Math.floor(Math.random() * textArray.length)] = getRandomLetter();
          return textArray.join("");
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [matrixEffect, fontStyle]);

  useEffect(() => {
    const loadFontsAndSetText = async () => {
      await document.fonts.ready;
      setFontsLoaded(true);

      // Preload arial5 text and calculate the number of lines
      const arial5Text = preloadExpansion();
      setDisplayText(arial5Text);

      if (isMobile) {
        const lines = calculateArial5Lines();
        setArial5Lines(lines);
      }
    };

    loadFontsAndSetText();
    const resizeHandler = () => setDisplayText(preloadExpansion());
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fontStyle, isMobile]);

  const handleSm00chClick = () => {
    if (isMobile) {
      // Generate random letters for each line without gaps
      const sm00chText = Array.from({ length: arial5Lines }, () =>
        Array.from({ length: 50 }, () => {
          const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          return alphabet[Math.floor(Math.random() * alphabet.length)];
        }).join("")
      ).join("\n");

      setDisplayText(sm00chText);
    }
    setFontStyle("sm00ch");
  };

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden relative pointer-events-auto">
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-row gap-1 z-50 sm:bottom-5 sm:gap-4">
        <button onClick={() => setFontStyle("arial5")} className="custom-button bg-arial5-button" style={{ width: "200px", height: "100px" }}>
          <span className="button-text">gencive5</span>
        </button>
        <button onClick={() => setFontStyle("triple")} className="custom-button bg-triple-button" style={{ width: "200px", height: "100px" }}>
          <span className="button-text">rat portfolio</span>
        </button>
        <button onClick={handleSm00chClick} className="custom-button bg-sm00ch-button" style={{ width: "200px", height: "100px" }}>
          <span className="button-text">Sm00ch</span>
        </button>
      </div>

      {/* Render multiple text layers only for triple font */}
      {fontStyle === "triple" ? (
        textRefs.map((ref, index) => (
          <p 
            key={index} 
            ref={ref} 
            className={`text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words z-0 ${fonts.triple[index]}`}
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
        ))
      ) : (
        // Render single text layer for other fonts
        <p 
          ref={textRefs[0]}
          className={`text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words z-0 ${fonts[fontStyle]}`}
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
      )}
    </div>
  );
}