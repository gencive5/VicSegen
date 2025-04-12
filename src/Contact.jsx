<p 
        ref={textRefs[0]}
        className="font-arial leading-none text-left break-words z-0 text-[11vw] sm:text-[6vw]"
        style={{
          position: "absolute",
          top: "1rem",
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
        {' '}
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
        </span>
        </p>
        

        export default Contact;