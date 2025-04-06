import { useEffect, useState, useRef } from "react";
import FontButtons from "./FontButtons";
import FontLinks from "./FontLinks";
import TextContent from "./TextContent";
import MatrixTextEffect from "./MatrixTextEffect";

export default function Text({ activeFont, onInteraction }) {
  const [displayText, setDisplayText] = useState("H");
  const [fontStyle, setFontStyle] = useState("hiiii");
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

  useEffect(() => {
    if (activeFont) {
      setShowAboutText(false);
      setFontStyle(activeFont);
      setDisplayText(preloadExpansion());
    }
  }, [activeFont]);

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

  useEffect(() => {
    if (!containerRef.current || !fontStyle) return;

    const resizeObserver = new ResizeObserver(() => {
      setDisplayText(preloadExpansion());
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [fontStyle, showAboutText]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full overflow-visible relative pointer-events-auto p-2 md:p-4 flex flex-col gap-1"
    >
      <MatrixTextEffect 
        text={displayText}
        setText={setDisplayText}
        fontStyle={fontStyle}
      />
      
      <div className="flex-none">
        <FontButtons 
          handleButtonClick={handleButtonClick} 
          handleSm00chClick={handleSm00chClick}
          handleAboutClick={handleAboutClick}
        />
      </div>
      
      <div className="flex-grow min-h-0 relative">
        <TextContent 
          fontStyle={fontStyle} 
          fonts={fonts} 
          displayText={displayText} 
          fontsLoaded={fontsLoaded} 
          textRefs={textRefs}
          showAboutText={showAboutText}
        />
      </div>
      
      <div className="flex-none">
        <FontLinks fontStyle={fontStyle} fontLinks={fontLinks} />
      </div>
    </div>
  );
}