const FontLinks = ({ fontStyle, fontLinks }) => {
    if (!fontStyle) return null;
  
    return (
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50">
        <a 
          href={fontLinks[fontStyle].url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base"
        >
          {fontLinks[fontStyle].text}
        </a>
      </div>
    );
  };
  
  export default FontLinks; // Make sure this line exists