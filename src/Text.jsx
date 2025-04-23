import { useEffect, useState, useRef } from "react";
import FontButtons from "./FontButtons";
import FontLinks from "./FontLinks";
import TextContent from "./TextContent";
import MatrixTextEffect from "./MatrixTextEffect";

export default function Text({ activeFont, onInteraction }) {
  const [displayText, setDisplayText] = useState(activeFont === "hiiii" ? "Hi" : "");
  const [fontStyle, setFontStyle] = useState(activeFont || "hiiii");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [initialMobileLoad, setInitialMobileLoad] = useState(false);
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];
  const isResizingRef = useRef(false);
  const transformIntervalRef = useRef(null);

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

  // Mobile detection with initial load handling
  useEffect(() => {
    const checkMobile = () => {
      const mobileCheck = window.innerWidth <= 768;
      setIsMobile(mobileCheck);
      
      if (mobileCheck && !initialMobileLoad) {
        setInitialMobileLoad(true);
        // Force a resize calculation after everything loads
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [initialMobileLoad]);

  // Animation effect for hiiii
  useEffect(() => {
    if (transformIntervalRef.current) clearInterval(transformIntervalRef.current);
    
    if (fontStyle === "hiiii") {
      transformIntervalRef.current = setInterval(transformRandomCharacters, 600);
    }
    
    return () => {
      if (transformIntervalRef.current) clearInterval(transformIntervalRef.current);
    };
  }, [fontStyle]);

  const transformRandomCharacters = () => {
    setDisplayText(prevText => {
      if (prevText.length < 2) return prevText;
      const firstTwo = prevText.slice(0, 2);
      const rest = prevText.slice(2);
      const restArray = rest.split('');
      const randomIndex = Math.floor(Math.random() * restArray.length);
      
      if (restArray[randomIndex] === 'i') {
        restArray[randomIndex] = '!';
      } else if (restArray[randomIndex] === '!') {
        restArray[randomIndex] = 'i';
      }
      
      return firstTwo + restArray.join('');
    });
  };

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
    return (
      textRefs[0].current.scrollWidth > containerRef.current.clientWidth || 
      textRefs[0].current.scrollHeight > containerRef.current.clientHeight
    );
  };

  const preloadExpansion = () => {
    let text = fontStyle === "hiiii" ? "Hi" : "";
    
    // Special handling for initial mobile load
    if (isMobile && fontStyle === "hiiii" && !initialMobileLoad) {
      return "Hi"; // Start minimal, let resize handler expand it
    }

    // Initial expansion
    while (true) {
      const newText = text + getRandomLetter();
      if (checkOverflow(newText)) break;
      text = newText;
    }

    // Precise trimming
    while (text.length > 0 && checkOverflow(text)) {
      text = text.slice(0, -1);
    }

    // Font-specific adjustments
    if (fontStyle === "sm00ch" && text.length > 2) {
      text = text.slice(0, -2);
    } 
    else if (fontStyle === "arial5" && text.length > 1) {
      text = text.slice(0, -2);
    }
    else if (fontStyle === "hiiii") {
      text = text.length >= 2 ? text : "Hi";
    }

    return text;
  };

  // Active font change handler
  useEffect(() => {
    if (activeFont) {
      setFontStyle(activeFont);
      setDisplayText(activeFont === "hiiii" ? "Hi" : preloadExpansion());
    }
  }, [activeFont]);

  // Font loading and resize handlers
  useEffect(() => {
    if (!fontStyle) return;
    
    const loadFontsAndSetText = async () => {
      try {
        await document.fonts.ready;
        setFontsLoaded(true);
        
        // Special timing for mobile initial load
        if (isMobile && fontStyle === "hiiii") {
          setTimeout(() => {
            setDisplayText(preloadExpansion());
          }, 100);
        } else {
          setDisplayText(preloadExpansion());
        }
      } catch (error) {
        console.error("Font loading error:", error);
        setDisplayText(fontStyle === "hiiii" ? "Hi" : getRandomLetter());
      }
    };

    loadFontsAndSetText();
    
    const resizeHandler = () => {
      if (isResizingRef.current) return;
      isResizingRef.current = true;
      setDisplayText(preloadExpansion());
      setTimeout(() => isResizingRef.current = false, 100);
    };
    
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fontStyle, isMobile]);

  // Resize observer
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