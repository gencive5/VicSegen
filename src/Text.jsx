import { useEffect, useState, useRef } from "react";
import FontButtons from "./FontButtons";
import FontLinks from "./FontLinks";
import TextContent from "./TextContent";
import MatrixTextEffect from "./MatrixTextEffect";

export default function Text({ activeFont, onInteraction }) {
  const [displayText, setDisplayText] = useState("H");
  const [fontStyle, setFontStyle] = useState("hiiii");
  const [fontsLoaded, setFontsLoaded] = useState(false);
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleButtonClick = (font) => {
    setFontStyle(font);
    onInteraction(font);
  };

  const handleSm00chClick = () => {
    setFontStyle("sm00ch");
    onInteraction("sm00ch");
  };

  const getRandomLetter = () => {
    if (fontStyle === "arial5") return ["5", "s", "S"][Math.floor(Math.random() * 3)];
    if (fontStyle === "triple") return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 52)];
    if (fontStyle === "hiiii") return "i";
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  };

  const checkOverflow = (text) => {
    if (!textRefs[0].current || !containerRef.current) return false;
    textRefs[0].current.textContent = text;
    
    if (fontStyle === "hiiii") {
      // More permissive check for hiiii (allows 10% overflow)
      return (
        textRefs[0].current.scrollWidth > containerRef.current.clientWidth * 1.10 || 
        textRefs[0].current.scrollHeight > containerRef.current.clientHeight * 1.10
      );
    }
    
    // Standard check for other fonts
    return (
      textRefs[0].current.scrollWidth > containerRef.current.clientWidth || 
      textRefs[0].current.scrollHeight > containerRef.current.clientHeight
    );
  };

  const preloadExpansion = () => {
    let text = fontStyle === "hiiii" ? "H" : "";
    while (true) {
      const newText = text + getRandomLetter();
      if (checkOverflow(newText)) break;
      text = newText;
    }

    // Preserved original slicing logic
    if (fontStyle === "sm00ch" && text.length > 2) {
      return text.slice(0, -2);
    } else if (fontStyle === "arial5" && text.length > 1) {
      return text.slice(0, -2);
    } else if (fontStyle === "hiiii") {
      // Enhanced hiiii expansion
      const testElement = textRefs[0].current;
      const container = containerRef.current;
      
      if (testElement && container) {
        testElement.textContent = text;
        const currentWidth = testElement.scrollWidth;
        const currentHeight = testElement.scrollHeight;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Allow filling up to 110% of container
        if (currentWidth < containerWidth * 1.10 && 
            currentHeight < containerHeight * 1.10) {
          return text + (text.length < 100 ? getRandomLetter() : "");
        }
      }
    }
    
    return text;
  };

  useEffect(() => {
    if (activeFont) {
      setFontStyle(activeFont);
      setDisplayText(preloadExpansion());
    }
  }, [activeFont]);

  useEffect(() => {
    if (!fontStyle) return;
    
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
  }, [fontStyle]);

  useEffect(() => {
    if (!containerRef.current || !fontStyle) return;
    const resizeObserver = new ResizeObserver(() => {
      if (!isResizingRef.current) {
        setDisplayText(preloadExpansion());
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [fontStyle]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isMobile && <div className="fixed inset-0 bg-white z-0" />}
      
      <div className="absolute inset-0 p-2 md:p-4">
        <MatrixTextEffect text={displayText} setText={setDisplayText} fontStyle={fontStyle} />
        <TextContent 
          fontStyle={fontStyle} 
          fonts={fonts} 
          displayText={displayText} 
          fontsLoaded={fontsLoaded} 
          textRefs={textRefs}
          isMobile={isMobile}
        />
      </div>
      
      <FontButtons 
        handleButtonClick={handleButtonClick} 
        handleSm00chClick={handleSm00chClick}
      />
      
      <FontLinks fontStyle={fontStyle} fontLinks={fontLinks} />
    </div>
  );
}