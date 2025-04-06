import AboutText from "./AboutText";
import { useEffect, useState } from "react";

const countLines = (element) => {
  if (!element) return 0;
  
  // Temporarily make it visible if hidden
  const wasHidden = element.style.visibility === 'hidden';
  if (wasHidden) {
    element.style.visibility = 'visible';
  }
  
  // Force layout calculation
  const range = document.createRange();
  range.selectNodeContents(element);
  const rects = range.getClientRects();
  
  // Restore original visibility
  if (wasHidden) {
    element.style.visibility = 'hidden';
  }
  
  return rects.length;
};

const TextContent = ({ fontStyle, fonts, displayText, fontsLoaded, textRefs, showAboutText }) => {
  const [lineCounts, setLineCounts] = useState([0, 0, 0]);

  useEffect(() => {
    if (!fontsLoaded) return;

    const updateLineCounts = () => {
      if (fontStyle === "triple") {
        const counts = textRefs.map(ref => countLines(ref.current));
        setLineCounts(counts);
      } else if (fontStyle) {
        setLineCounts([countLines(textRefs[0].current), 0, 0]);
      }
    };

    // Use setTimeout to ensure the update happens after rendering
    const timer = setTimeout(updateLineCounts, 0);

    return () => clearTimeout(timer);
  }, [displayText, fontsLoaded, fontStyle, textRefs]);

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
            <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 opacity-75">
              Lines: {lineCounts[index]}
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
        <div className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 opacity-75">
          Lines: {lineCounts[0]}
        </div>
      )}
    </div>
  );
};

export default TextContent;