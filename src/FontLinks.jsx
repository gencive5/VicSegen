const FontLinks = ({ fontStyle, fontLinks }) => {
  if (!fontStyle || !fontLinks[fontStyle]) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <a 
        href={fontLinks[fontStyle].url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`
          bg-cover bg-no-repeat bg-center 
          hover:opacity-80 transition-opacity 
          opacity-90 md:opacity-100
          w-[308px] h-[104px]       /* Mobile size */
          md:w-[340px] md:h-[120px]  /* Desktop size */
          max-w-[95vw]              /* Prevent overflow on small screens */
          ${fontStyle === "arial5" ? "vbg-arial5-button" :
            fontStyle === "triple" ? "vbg-triple-button" :
            "vbg-sm00ch-button"}
        `}
        aria-label={`Visit ${fontLinks[fontStyle].text}`}
      />
    </div>
  );
};

export default FontLinks;