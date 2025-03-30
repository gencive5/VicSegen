const TextContent = ({ fontStyle, fonts, displayText, fontsLoaded, textRefs }) => {
    if (!fontStyle) return null;
  
    return fontStyle === "triple" ? (
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
    );
  };
  
  export default TextContent; // Make sure this line exists