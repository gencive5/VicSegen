import { useEffect } from "react";
import AboutText from "./AboutText";

const TextContent = ({
  fontStyle,
  fonts,
  displayText,
  fontsLoaded,
  textRefs,
  showAboutText,
}) => {
  if (!fontStyle && !showAboutText) return null;

  if (showAboutText) {
    return <AboutText displayText={displayText} fontsLoaded={fontsLoaded} textRefs={textRefs} />;
  }

  const textClassName = fonts[fontStyle];

  return fontStyle === "triple" ? (
    <>
      {textRefs.map((ref, index) => (
        <div key={index}>
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
        </div>
      ))}
    </>
  ) : (
    <div>
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
    </div>
  );
};

export default TextContent;