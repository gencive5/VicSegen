const FontButtons = ({ handleButtonClick, handleSm00chClick }) => {
  return (
    <>
      {/* Mobile - Right Column (hidden on desktop) */}
      <div className="sm:hidden fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50 items-end">
        <button 
          onClick={() => handleButtonClick("arial5")} 
          className="custom-button bg-arial5-button hover:opacity-90 transition-opacity"
          style={{ width: '200px', height: '100px' }}
        />
        <button 
          onClick={() => handleButtonClick("triple")} 
          className="custom-button bg-triple-button hover:opacity-90 transition-opacity"
          style={{ width: '200px', height: '100px' }}
        />
        <button 
          onClick={handleSm00chClick} 
          className="custom-button bg-sm00ch-button hover:opacity-90 transition-opacity"
          style={{ width: '200px', height: '100px' }}
        />
      </div>

      {/* Desktop - Left Column (hidden on mobile) */}
      <div className="hidden sm:flex fixed left-0 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-50">
        <button 
          onClick={() => handleButtonClick("arial5")} 
          className="custom-button bg-arial5-button hover:opacity-90 transition-opacity"
          style={{ width: '300px', height: '150px' }}
        />
        <button 
          onClick={() => handleButtonClick("triple")} 
          className="custom-button bg-triple-button hover:opacity-90 transition-opacity"
          style={{ width: '300px', height: '150px' }}
        />
        <button 
          onClick={handleSm00chClick} 
          className="custom-button bg-sm00ch-button hover:opacity-90 transition-opacity"
          style={{ width: '300px', height: '150px' }}
        />
      </div>
    </>
  );
};

export default FontButtons;