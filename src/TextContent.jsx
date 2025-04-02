const TextContent = ({ fontStyle, fonts, displayText, fontsLoaded, textRefs, showAboutText }) => {
  // Show nothing if no font style is selected and not in about mode
  if (!fontStyle && !showAboutText) return null;

  // Use Arial font when in about mode
  const textClassName = showAboutText ? "font-arial font-normal" : fonts[fontStyle];

  // About text with links
  const aboutText = showAboutText ? (
    <>
      Paris-based designer & developer specializing in web design, front-end development, typography, and graphic design. Contact me via{" "}
      <span 
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://instagram.com/gencive5', '_blank');
        }}
        className="text-blue-500 hover:underline cursor-pointer"
      >
        Instagram
      </span>{" "}
      or{" "}
      <span 
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = 'mailto:vic.segen@gmail.com';
        }}
        className="text-blue-500 hover:underline cursor-pointer"
      >
        Email
      </span>.
    </>
  ) : displayText;


  return fontStyle === "triple" && !showAboutText ? (
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
      className={`text-[12vw] sm:text-[9vw] ${
        showAboutText ? 'xs:text-[10vw] max-sm:text-[11vw] sm:text-[5vw] md:text-[6.5vw]' : 'font-bold'
      } leading-none text-left break-words z-0 ${textClassName}`}
      style={{
        position: "absolute",
        top: "1.6rem",
        left: "1.6rem",
        right: "1.6rem",
        bottom: "1.6rem",
        wordBreak: showAboutText ? "break-all" : "break-word",
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
      {showAboutText ? aboutText : displayText}
    </p>
  );
};

export default TextContent;