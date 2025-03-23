import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("Loading...");
  const [fontStyle, setFontStyle] = useState("arial5");
  const [matrixEffect, setMatrixEffect] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"],
    arial5: ["font-arial5", "font-arial5", "font-arial5"],
    sm00ch: ["font-sm00ch", "font-sm00ch", "font-sm00ch"],
  };

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
    return textRefs.some((ref) => {
      if (!ref.current || !containerRef.current) return false;
      ref.current.textContent = text;
      return ref.current.scrollWidth > containerRef.current.clientWidth || ref.current.scrollHeight > containerRef.current.clientHeight;
    });
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
  }, [matrixEffect]);

  useEffect(() => {
    const loadFontsAndSetText = async () => {
      await document.fonts.ready; // Ensure fonts are fully loaded
      setFontsLoaded(true);
      requestAnimationFrame(() => {
        setDisplayText(preloadExpansion());
      });
    };

    loadFontsAndSetText();

    const resizeHandler = () => {
      requestAnimationFrame(() => {
        setDisplayText(preloadExpansion());
      });
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fontStyle]);

  const handleSm00chClick = async () => {
    setFontStyle("sm00ch");
    await document.fonts.ready; // Wait for fonts to load before updating text
    requestAnimationFrame(() => {
      setDisplayText(preloadExpansion());
    });
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
        <button onClick={() => setMatrixEffect((prev) => !prev)} className="custom-button bg-matrix-button">
          <span>{matrixEffect ? "Stop Matrix" : "Start Matrix"}</span>
        </button>
      </div>

      {textRefs.map((ref, index) => (
        <p key={index} ref={ref} className={`text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words z-0 ${fonts[fontStyle][index]}`}
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
          }}>
          {displayText}
        </p>
      ))}
    </div>
  );
}
