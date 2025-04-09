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

  const MobileBackground = ({ children }) => (
    <div className={`relative h-full w-full ${isMobile ? 'bg-white' : ''}`}>
      {children}
    </div>
  );

  if (fontStyle === "triple") {
    return (
      <div className={`absolute inset-0 ${isMobile ? 'bg-white' : ''}`}>
        {textRefs.map((ref, index) => (
          <p 
            key={index}
            ref={ref}
            className={`text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words ${
              fonts.triple[index]
            } ${
              !fontsLoaded ? 'font-arial' : ''
            }`}
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
              transform: index === 0 ? "scaleX(-1)" : "none"
            }}
          >
            {displayText}
          </p>
        ))}
      </div>
    );
  }

  return (
    <MobileBackground>
      <p 
        ref={textRefs[0]}
        className={`text-[12vw] sm:text-[9vw] font-bold leading-none text-left break-words ${
          textClassName
        } ${
          !fontsLoaded ? 'font-arial' : ''
        }`}
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
    </MobileBackground>
  );
};

export default TextContent;