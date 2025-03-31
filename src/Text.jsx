import { useEffect, useState, useRef } from "react";

export default function Text({ activeFont, onInteraction }) {
  const [displayText, setDisplayText] = useState("");
  const [fontStyle, setFontStyle] = useState(null);
  const [matrixEffect, setMatrixEffect] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"],
    arial5: "font-arial5",
    sm00ch: "font-sm00ch",
  };

  // Font to website link mapping
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
    }
  };

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

  const handleButtonClick = (font) => {
    setFontStyle(font);
    onInteraction(font);
  };

  const handleSm00chClick = () => {
    setFontStyle("sm00ch");
    onInteraction("sm00ch");
  };

  useEffect(() => {
    if (activeFont) {
      setFontStyle(activeFont);
      setDisplayText(preloadExpansion());
    }
  }, [activeFont]);

  useEffect(() => {
    let interval;
    if (matrixEffect && fontStyle) {
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
    if (!fontStyle) return;
    
    const loadFontsAndSetText = async () => {
      await document.fonts.ready;
      setFontsLoaded(true);
      setDisplayText(preloadExpansion());
    };

    loadFontsAndSetText();
    const resizeHandler = () => setDisplayText(preloadExpansion());
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fontStyle]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden relative pointer-events-auto p-4 md:p-6">
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-row gap-1 z-50 sm:bottom-5 sm:gap-4">
        <button 
          onClick={() => handleButtonClick("arial5")} 
          className="custom-button bg-arial5-button hover:opacity-90 transition-opacity" 
          style={{ width: "400px", height: "200px" }}
        />
        <button 
          onClick={() => handleButtonClick("triple")} 
          className="custom-button bg-triple-button hover:opacity-90 transition-opacity" 
          style={{ width: "400px", height: "200px" }}
        />
        <button 
          onClick={handleSm00chClick} 
          className="custom-button bg-sm00ch-button hover:opacity-90 transition-opacity" 
          style={{ width: "400px", height: "200px" }}
        />
      </div>

      {/* New website link button */}
      {fontStyle && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50">
          <a 
            href={fontLinks[fontStyle].url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base"
          >
            {fontLinks[fontStyle].text}
          </a>
        </div>
      )}

      {fontStyle && (fontStyle === "triple" ? (
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
              opacity: 1,
              visibility: fontsLoaded ? "visible" : "hidden",
              transform: index === 0 ? "scaleX(-1)" : "none"
            }}
          >
            {displayText}
          </p>
        ))
      ) : (
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
      ))}
    </div>
  );
}