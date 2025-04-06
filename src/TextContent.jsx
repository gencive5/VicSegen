import { useEffect } from "react";
import AboutText from "./AboutText";

const TextContent = ({
  fontStyle,
  fonts,
  displayText,
  fontsLoaded,
  textRefs,
  showAboutText,
  maxLineCount
}) => {
  useEffect(() => {
    if (!fontsLoaded || !textRefs[0].current) return;
    
    const updateCounter = () => {
      const range = document.createRange();
      range.selectNodeContents(textRefs[0].current);
      const currentLines = range.getClientRects().length;
      
      const counter = textRefs[0].current.parentElement.querySelector('.line-counter');
      if (counter) {
        counter.textContent = `${currentLines}${maxLineCount ? `/${maxLineCount}` : ''}`;
        counter.className = `line-counter absolute bottom-0 right-0 px-2 py-1 text-xs ${
          currentLines > maxLineCount 
            ? 'bg-red-500 text-white' 
            : 'bg-black text-white opacity-75'
        }`;
      }
    };

    updateCounter();
  }, [displayText, fontsLoaded, maxLineCount]);

  if (!fontStyle && !showAboutText) return null;

  if (showAboutText) {
    return <AboutText displayText={displayText} fontsLoaded={fontsLoaded} textRefs={textRefs} />;
  }

  const textClassName = fonts[fontStyle];

  return fontStyle === "triple" ? (
    <>
      {textRefs.map((ref, index) => (
        <div key={index} style={{ position: 'relative' }}>
          <p 
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
          {fontsLoaded && (
            <div className="line-counter absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 opacity-75">
              -
            </div>
          )}
        </div>
      ))}
    </>
  ) : (
    <div style={{ position: 'relative' }}>
      <p 
        ref={textRefs[0]}
        className={`text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words z-0 ${textClassName}`}
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
        }}
      >
        {displayText}
      </p>
      {fontsLoaded && (
        <div className="line-counter absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 opacity-75">
          -
        </div>
      )}
    </div>
  );
};

export default TextContent;