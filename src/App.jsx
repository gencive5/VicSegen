// App.jsx
import './styles.css';
import SharkScene from "./SharkScene";
import ExpandingTextPanel from "./ExpandingTextPanel";
import { useState } from "react";

function App() {
  const [textConfig, setTextConfig] = useState({
    text: "Hi",
    font: "font-bold"
  });

  const handleTextChange = (newText, newFont) => {
    setTextConfig({
      text: newText,
      font: newFont
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden overscroll-none">
      <ExpandingTextPanel textConfig={textConfig} />

      {/* Button Container with inline-flex to prevent stretching */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 inline-flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("Welcome to the ocean!", "font-serif")}
        >
          Change to Serif
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("Deep sea adventure!", "font-mono")}
        >
          Change to Mono
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("Sharks ahead!", "font-sans")}
        >
          Change to Sans
        </button>
        {/* New Reset Button */}
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("Hi", "font-bold")}
        >
          Reset
        </button>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
        <SharkScene />
      </div>
    </div>
  );
}

export default App;
