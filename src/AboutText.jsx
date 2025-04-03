const AboutText = ({ displayText, fontsLoaded, textRefs }) => {
    return (
      <p 
        ref={textRefs[0]}
        className="text-[12vw] sm:text-[9vw] xs:text-[10vw] max-sm:text-[11vw] sm:text-[5vw] md:text-[6.5vw] font-arial font-normal leading-none text-left break-words z-0"
        style={{
          position: "absolute",
          top: "1.6rem",
          left: "1.6rem",
          right: "1.6rem",
          bottom: "1.6rem",
          wordBreak: "break-all",
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
        Paris-based designer & developer specializing in web design, front-end development, typography, and graphic design. Contact me via <a href="https://instagram.com/gencive5" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">Instagram</a> or <a href="mailto:vic.segen@gmail.com" className="underline hover:text-blue-500">Email</a>.
      </p>
    );
  };
  
  export default AboutText;