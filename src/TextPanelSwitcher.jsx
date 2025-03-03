import { useState, useEffect, useRef } from "react";

// Define different text styles for each panel
const textStyles = {
  gencive5: "font-serif text-3xl",
  sm00ch: "font-mono text-2xl",
  ratPortfolio: "font-sans text-xl",
};

// Placeholder text for each panel
const placeholderText = {
  gencive5: "This is the Gencive5 panel. Lorem ipsum dolor sit amet.",
  sm00ch: "Welcome to Sm00ch! Dolor sit amet, consectetur adipiscing.",
  ratPortfolio: "Rat Portfolio time! Consectetur adipiscing elit.",
};

export default function ExpandingTextPanel() {
  const [text, setText] = useState("Hi");
  const [activePanel, setActivePanel] = useState(null); // Track which panel is active
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (activePanel) return; // Stop expanding text if a panel is active

    const updateText = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const textWidth = textRef.current.scrollWidth;
        const textHeight = textRef.current.scrollHeight;

        textRef.current.textContent = text + "i";
        const newWidth = textRef.current.scrollWidth;
        const newHeight = textRef.current.scrollHeight;

        textRef.current.textContent = text;

        if (newWidth <= containerWidth && newHeight <= containerHeight) {
          setText((prev) => prev + "i");
        }
      }
    };

    const interval = setInterval(updateText, 50);
    window.addEventListener("resize", updateText);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateText);
    };
  }, [text, activePanel]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 overflow-hidden relative">
      {/* Dynamic panel switching */}
      <div className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center">
        {activePanel ? (
          // Static text panel with different styles
          <div
            className={`w-4/5 h-2/3 p-6 bg-white/80 rounded-2xl shadow-xl overflow-auto ${textStyles[activePanel]}`}
          >
            {placeholderText[activePanel]}
          </div>
        ) : (
          // Expanding text panel
          <p
            ref={textRef}
            className="text-[9vw] font-bold leading-none text-left break-words"
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            {text}
          </p>
        )}
      </div>

      {/* Buttons at the bottom */}
      <div className="absolute bottom-8 w-full flex justify-center gap-4 z-10">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          onClick={() => setActivePanel("gencive5")}
        >
          gencive5
        </button>
        <button
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          onClick={() => setActivePanel("sm00ch")}
        >
          sm00ch
        </button>
        <button
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          onClick={() => setActivePanel("ratPortfolio")}
        >
          rat portfolio
        </button>
      </div>
    </div>
  );
}
