const FontButtons = ({ handleButtonClick, handleSm00chClick, handleAboutClick }) => {
  return (
    <>
      {/* About button at the top - always visible */}
      <button 
        onClick={handleAboutClick}
        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-70 bg-about-button bg-no-repeat bg-center bg-contain hover:opacity-90 transition-opacity"
        style={{ width: '140px', height: '70px' }}
        aria-label="About"
     />

      {/* Mobile - Right Column (hidden on desktop) */}
      <div className="sm:hidden fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-70 items-end opacity-80">
        <button 
          onClick={() => handleButtonClick("arial5")} 
          className="custom-button bg-arial5-button hover:opacity-80 transition-opacity"
          style={{ width: '120px', height: '120px' }}
          aria-label="Select gencive5"
        />
        <button 
          onClick={() => handleButtonClick("triple")} 
          className="custom-button bg-triple-button hover:opacity-80 transition-opacity"
          style={{ width: '120px', height: '120px' }}
          aria-label="Select rat portfolio"
        />
        <button 
          onClick={handleSm00chClick} 
          className="custom-button bg-sm00ch-button hover:opacity-80 transition-opacity"
          style={{ width: '120px', height: '120px' }}
          aria-label="Select Sm00ch"
        />
      </div>

      {/* Desktop - Left Column (hidden on mobile) */}
      <div className="hidden sm:flex fixed left-5 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-60">
        <button 
          onClick={() => handleButtonClick("arial5")} 
          className="custom-button bg-arial5-button hover:opacity-90 transition-opacity"
          style={{ width: '140px', height: '140px' }}
          aria-label="Select gencive5"
        />
        <button 
          onClick={() => handleButtonClick("triple")} 
          className="custom-button bg-triple-button hover:opacity-90 transition-opacity"
          style={{ width: '140px', height: '140px' }}
          aria-label="Select rat portfolio"
        />
        <button 
          onClick={handleSm00chClick} 
          className="custom-button bg-sm00ch-button hover:opacity-90 transition-opacity"
          style={{ width: '140px', height: '140px' }}
          aria-label="Select Sm00ch"
        />
      </div>
    </>
  );
};

export default FontButtons;