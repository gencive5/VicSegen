const AboutText = ({ fontsLoaded, textRefs }) => {
    return (
      <p 
        ref={textRefs[0]}
        className="font-arial font-normal leading-none text-left break-words z-0 text-[11vw] sm:text-[9vw] xs:text-[10vw] max-sm:text-[11vw] sm:text-[5vw] md:text-[6.4vw] "
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
        Paris-based designer & developer specializing in web design, front-end development, typography, and graphic design. Contact me via{' '}
        <span className="whitespace-nowrap">
          <a 
            href="https://instagram.com/gencive5" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:opacity-80 transition-opacity"
            style={{
              background: 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Instagram
          </a>
        </span>{' '}
        or{' '}
        <span className="whitespace-nowrap">
          <a 
            href="mailto:vic.segen@gmail.com" 
            className="underline hover:opacity-80 transition-opacity"
            style={{
              color: '#1A73E8',
            }}
          >
            Email
          </a>
        </span>.
      </p>
    );
  };
  
  export default AboutText;