const FontButtons = ({ handleButtonClick, handleSm00chClick }) => {
    return (
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-row gap-1 z-50 sm:bottom-5 sm:gap-4">
        <button 
          onClick={() => handleButtonClick("arial5")} 
          className="custom-button bg-arial5-button hover:opacity-90 transition-opacity" 
          style={{ width: "400px", height: "200px" }}
        />
        <button 
          onClick={() => handleButtonClick("triple")} 
          className="custom-button bg-triple-button hover:opacity-90 transition-opacity" 
          style={{ width: "400px", height: "200px" }}
        />
        <button 
          onClick={handleSm00chClick} 
          className="custom-button bg-sm00ch-button hover:opacity-90 transition-opacity" 
          style={{ width: "400px", height: "200px" }}
        />
      </div>
    );
  };
  
  export default FontButtons; // Make sure this line exists