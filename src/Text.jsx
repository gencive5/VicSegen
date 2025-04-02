import { useEffect, useState, useRef } from "react";
import FontButtons from "./FontButtons";
import FontLinks from "./FontLinks";
import TextContent from "./TextContent";

export default function Text({ activeFont, onInteraction }) {
  const [displayText, setDisplayText] = useState("H");
  const [fontStyle, setFontStyle] = useState("hiiii");
  const [matrixEffect, setMatrixEffect] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showAboutText, setShowAboutText] = useState(false);
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"],
    arial5: "font-arial5",
    sm00ch: "font-sm00ch",
    arial: "font-arial",
    hiiii: "font-arial5"
  };

  const fontLinks = {
    arial5: {
      text: 'visit gencive5.com',
      url: 'https://gencive5.com/'
    },
    triple: {
      text: 'visit ratfaggotking.fr',
      url: 'https://ratfaggotking.fr/'
    },
    sm00ch: {
      text: 'visit sm00ch.xyz',
      url: 'https://sm00ch.xyz/'
    },
    hiiii: null
  };

  const aboutText = "Paris-based designer & developer specializing in web design, front-end development, typography, and graphic design. Contact me via Instagram or Email.";

  const getRandomLetter = () => {
    if (showAboutText) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    if (fontStyle === "arial5") {
      return ["5", "s", "S"][Math.floor(Math.random() * 3)];
    } else if (fontStyle === "triple") {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    } else if (fontStyle === "hiiii") {
      return "i";
    } else {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  };

  const checkOverflow = (text) => {
    if (!textRefs[0].current || !containerRef.current) return false;
    textRefs[0].current.textContent = text;
    return textRefs[0].current.scrollWidth > containerRef.current.clientWidth || 
           textRefs[0].current.scrollHeight > containerRef.current.clientHeight;
  };

  const preloadExpansion = () => {
    if (showAboutText) {
      return aboutText;
    }
    
    let text = fontStyle === "hiiii" ? "H" : "";
    while (true) {
      const newText = text + getRandomLetter();
      if (checkOverflow(newText)) break;
      text = newText;
    }
    return text;
  };

  const handleButtonClick = (font) => {
    setShowAboutText(false);
    setFontStyle(font);
    onInteraction(font);
  };

  const handleSm00chClick = () => {
    setShowAboutText(false);
    setFontStyle("sm00ch");
    onInteraction("sm00ch");
  };

  const handleAboutClick = () => {
    setShowAboutText(true);
    setFontStyle(null);
    onInteraction(null);
  };

  useEffect(() => {
    if (activeFont) {
      setShowAboutText(false);
      setFontStyle(activeFont);
      setDisplayText(preloadExpansion());
    }
  }, [activeFont]);

  useEffect(() => {
    let interval;
    if (matrixEffect && (fontStyle || showAboutText)) {
      interval = setInterval(() => {
        setDisplayText((prevText) => {
          const textArray = prevText.split("");
          textArray[Math.floor(Math.random() * textArray.length)] = getRandomLetter();
          return textArray.join("");
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [matrixEffect, fontStyle, showAboutText]);

  useEffect(() => {
    if (!fontStyle && !showAboutText) return;
    
    const loadFontsAndSetText = async () => {
      await document.fonts.ready;
      setFontsLoaded(true);
      setDisplayText(preloadExpansion());
    };

    loadFontsAndSetText();
    const resizeHandler = () => setDisplayText(preloadExpansion());
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fontStyle, showAboutText]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden relative pointer-events-auto p-4 md:p-6">
      <FontButtons 
        handleButtonClick={handleButtonClick} 
        handleSm00chClick={handleSm00chClick}
        handleAboutClick={handleAboutClick}
      />
      
      <FontLinks fontStyle={fontStyle} fontLinks={fontLinks} />
      
      <TextContent 
        fontStyle={fontStyle} 
        fonts={fonts} 
        displayText={displayText} 
        fontsLoaded={fontsLoaded} 
        textRefs={textRefs}
        showAboutText={showAboutText}
      />
    </div>
  );
}