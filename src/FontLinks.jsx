const FontLinks = ({ fontStyle, fontLinks }) => {
    if (!fontStyle) return null;
  
    return (
        <div className="fixed bottom-2 left-0 right-0 flex justify-center z-50">
        <a 
          href={fontLinks[fontStyle].url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`bg-cover bg-no-repeat bg-center hover:opacity-90 transition-opacity ${
            fontStyle === "arial5" ? "vbg-arial5-button" :
            fontStyle === "triple" ? "vbg-triple-button" :
            "vbg-sm00ch-button"
          }`}
          style={{ 
            width: "300px", 
            height: "100px",
            display: "block" 
          }}
          aria-label={`Visit ${fontLinks[fontStyle].text}`}
        />
      </div>
    );
  };
  
  export default FontLinks; 
