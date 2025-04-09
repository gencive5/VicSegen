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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];
  const isResizingRef = useRef(false);

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"],
    arial5: "font-arial5",
    sm00ch: "font-sm00ch",
    arial: "font-arial",
    hiiii: "font-arial5"
  };

  const fontLinks = {
    arial5: { text: 'visit gencive5.com', url: 'https://gencive5.com/' },
    triple: { text: 'visit ratfaggotking.fr', url: 'https://ratfaggotking.fr/' },
    sm00ch: { text: 'visit sm00ch.xyz', url: 'https://sm00ch.xyz/' },
    hiiii: null
  };

  const aboutText = "Paris-based designer & developer specializing in web design, front-end development, typography, and graphic design. Contact me via Instagram or Email.";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    if (showAboutText) return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "[Math.floor(Math.random() * 53)];
    if (fontStyle === "arial5") return ["5", "s", "S"][Math.floor(Math.random() * 3)];
    if (fontStyle === "triple") return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 52)];
    if (fontStyle === "hiiii") return "i";
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  };

  const checkOverflow = (text) => {
    if (!textRefs[0].current || !containerRef.current) return false;
    textRefs[0].current.textContent = text;
    return textRefs[0].current.scrollWidth > containerRef.current.clientWidth || 
           textRefs[0].current.scrollHeight > containerRef.current.clientHeight;
  };

  const preloadExpansion = () => {
    if (showAboutText) return aboutText;
    
    let text = fontStyle === "hiiii" ? "H" : "";
    while (true) {
      const newText = text + getRandomLetter();
      if (checkOverflow(newText)) break;
      text = newText;
    }
  
    if (fontStyle === "sm00ch" && text.length > 2) {
      return text.slice(0, -2);
    } else if (fontStyle === "arial5" && text.length > 1) {
      return text.slice(0, -1);
    } else if (fontStyle === "hiiii") {
      const maxHeight = containerRef.current?.clientHeight;
      const textHeight = textRefs[0].current?.scrollHeight;
      if (maxHeight && textHeight && textHeight > maxHeight * 0.9) {
        return text.slice(0, -1);
      }
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
    
    const resizeHandler = () => {
      isResizingRef.current = true;
      setDisplayText(preloadExpansion());
      setTimeout(() => isResizingRef.current = false, 100);
    };
    
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fontStyle, showAboutText]);

  useEffect(() => {
    if (!containerRef.current || !fontStyle) return;
    const resizeObserver = new ResizeObserver(() => {
      if (!isResizingRef.current) {
        setDisplayText(preloadExpansion());
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [fontStyle, showAboutText]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* Background */}
      {isMobile && <div className="fixed inset-0 bg-white z-0" />}
      
      {/* Content Area */}
      <div className="absolute inset-0 p-2 md:p-4">
        <MatrixTextEffect text={displayText} setText={setDisplayText} fontStyle={fontStyle} />
        <TextContent 
          fontStyle={fontStyle} 
          fonts={fonts} 
          displayText={displayText} 
          fontsLoaded={fontsLoaded} 
          textRefs={textRefs}
          showAboutText={showAboutText}
          isMobile={isMobile}
        />
      </div>
      
      {/* UI Elements */}
      <FontButtons 
        handleButtonClick={handleButtonClick} 
        handleSm00chClick={handleSm00chClick}
        handleAboutClick={handleAboutClick}
      />
      
      <FontLinks fontStyle={fontStyle} fontLinks={fontLinks} />
    </div>
  );
}