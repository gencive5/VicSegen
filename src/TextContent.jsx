const TextContent = ({
  fontStyle,
  fonts,
  displayText,
  fontsLoaded,
  textRefs,
  isMobile
}) => {
  if (!fontStyle) return null;

  const textClassName = fonts[fontStyle];
  const padding = isMobile ? '0.5rem' : '1.6rem';

  const TextElement = ({ ref, className, index = 0 }) => (
    <p 
      ref={ref}
      className={`text-[12vw] sm:text-[9vw] leading-none text-left break-words ${className} ${
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
        transform: index === 0 && fontStyle === "triple" ? "scaleX(-1)" : "none"
      }}
    >
      {displayText}
    </p>
  );

  if (fontStyle === "triple") {
    return (
      <div className={`absolute inset-0 ${isMobile ? 'bg-white' : ''}`}>
        {textRefs.map((ref, index) => (
          <TextElement 
            key={index}
            ref={ref}
            className={fonts.triple[index]}
            index={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${isMobile ? 'bg-white' : ''}`}>
      <TextElement ref={textRefs[0]} className={textClassName} />
    </div>
  );
};

export default TextContent;