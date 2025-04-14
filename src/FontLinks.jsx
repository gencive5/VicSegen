const FontLinks = ({ fontStyle, fontLinks }) => {
  if (!fontStyle || !fontLinks[fontStyle]) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <a 
        href={fontLinks[fontStyle].url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`bg-cover bg-no-repeat bg-center hover:opacity-80 transition-opacity md:opacity-100 opacity-90 w-[300px] md:w-[300px] max-w-[240px] md:max-w-none ${
          fontStyle === "arial5" ? "vbg-arial5-button" :
          fontStyle === "triple" ? "vbg-triple-button" :
          "vbg-sm00ch-button"
        }`}
        style={{ 
          width: "340px", 
          height: "120px",
          display: "block" 
        }}
        aria-label={`Visit ${fontLinks[fontStyle].text}`}
      />
    </div>
  );
};

export default FontLinks;