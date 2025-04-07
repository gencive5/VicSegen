import AboutText from "./AboutText";

const TextContent = ({
  fontStyle,
  fonts,
  displayText,
  fontsLoaded,
  textRefs,
  showAboutText,
  isMobile
}) => {
  if (!fontStyle && !showAboutText) return null;
  if (showAboutText) return <AboutText displayText={displayText} fontsLoaded={fontsLoaded} textRefs={textRefs} />;

  const textClassName = fonts[fontStyle];
  const padding = isMobile ? '0.5rem' : '1.6rem';

  return fontStyle === "triple" ? (
    <>
      {textRefs.map((ref, index) => (
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
      ))}
    </>
  ) : (
    <div className={`absolute inset-0 ${isMobile ? 'bg-white -m-2' : ''}`}>
      <p 
        ref={textRefs[0]}
        className={`text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words ${textClassName}`}
        style={{
          position: "absolute",
          top: padding,
          left: padding,
          right: padding,
          bottom: padding,
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