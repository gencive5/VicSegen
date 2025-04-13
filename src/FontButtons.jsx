const FontButtons = ({ handleButtonClick, handleSm00chClick }) => {
  return (
    <>
      {/* Mobile Buttons */}
      <div className="sm:hidden fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-50 items-end">
        <button
          onClick={() => handleButtonClick("arial5")}
          className="hover:opacity-80 transition-opacity"
          style={{ width: '120px', height: '120px', padding: 0, border: 'none', background: 'transparent' }}
          aria-label="Select gencive5"
        >
          <picture>
            <source srcSet="/src/assets/Btngencive5.webp" type="image/webp" />
            <img src="/src/assets/Btngencive5.png" alt="gencive5" style={{ width: '100%', height: '100%' }} />
          </picture>
        </button>

        <button
          onClick={() => handleButtonClick("triple")}
          className="hover:opacity-80 transition-opacity"
          style={{ width: '120px', height: '120px', padding: 0, border: 'none', background: 'transparent' }}
          aria-label="Select rat portfolio"
        >
          <picture>
            <source srcSet="/src/assets/Btnrat.webp" type="image/webp" />
            <img src="/src/assets/Btnrat.png" alt="rat portfolio" style={{ width: '100%', height: '100%' }} />
          </picture>
        </button>

        <button
          onClick={handleSm00chClick}
          className="hover:opacity-80 transition-opacity"
          style={{ width: '120px', height: '120px', padding: 0, border: 'none', background: 'transparent' }}
          aria-label="Select Sm00ch"
        >
          <picture>
            <source srcSet="/src/assets/Btnsm00ch.webp" type="image/webp" />
            <img src="/src/assets/Btnsm00ch.png" alt="Sm00ch" style={{ width: '100%', height: '100%' }} />
          </picture>
        </button>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex fixed left-5 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-50">
        <button
          onClick={() => handleButtonClick("arial5")}
          className="hover:opacity-90 transition-opacity"
          style={{ width: '140px', height: '140px', padding: 0, border: 'none', background: 'transparent' }}
          aria-label="Select gencive5"
        >
          <picture>
            <source srcSet="/src/assets/Btngencive5.webp" type="image/webp" />
            <img src="/src/assets/Btngencive5.png" alt="gencive5" style={{ width: '100%', height: '100%' }} />
          </picture>
        </button>

        <button
          onClick={() => handleButtonClick("triple")}
          className="hover:opacity-90 transition-opacity"
          style={{ width: '140px', height: '140px', padding: 0, border: 'none', background: 'transparent' }}
          aria-label="Select rat portfolio"
        >
          <picture>
            <source srcSet="/src/assets/Btnrat.webp" type="image/webp" />
            <img src="/src/assets/Btnrat.png" alt="rat portfolio" style={{ width: '100%', height: '100%' }} />
          </picture>
        </button>

        <button
          onClick={handleSm00chClick}
          className="hover:opacity-90 transition-opacity"
          style={{ width: '140px', height: '140px', padding: 0, border: 'none', background: 'transparent' }}
          aria-label="Select Sm00ch"
        >
          <picture>
            <source srcSet="/src/assets/Btnsm00ch.webp" type="image/webp" />
            <img src="/src/assets/Btnsm00ch.png" alt="Sm00ch" style={{ width: '100%', height: '100%' }} />
          </picture>
        </button>
      </div>
    </>
  );
};

export default FontButtons;
