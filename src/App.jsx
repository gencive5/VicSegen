import './styles.css';
import SharkScene from "./SharkScene";
import ExpandingTextPanel from "./ExpandingTextPanel";
import { useState } from "react";

function App() {
  const [textConfig, setTextConfig] = useState({
    text: "Hi",
    font: "font-bold"
  });

  // Map texts to their corresponding links
  const linkMap = {
    "55555555s5555SSSssss555555": "https://gencive5.com/",
    "sm00ch": "https://sm00ch.xyz/",
    "!!!!!!!!!": "https://ratfaggotking.fr/"
  };

  const handleTextChange = (newText, newFont) => {
    setTextConfig({
      text: newText,
      font: newFont
    });
  };

  // Get the link based on the current text
  const currentLink = linkMap[textConfig.text] || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden overscroll-none">
      <div className="expanding-panel">
  <ExpandingTextPanel 
    textConfig={textConfig} 
    showLink={!!currentLink}
    link={currentLink}        
  />
</div>

<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-100 flex flex-wrap justify-center gap-2 px-4 md:gap-4 md:bottom-10">

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("55555555s5555SSSssss555555", "font-arial5")}
        >
          gencive5
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("sm00ch", "font-sm00ch")}
        >
          sm00ch
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("!!!!!!!!!", "font-sans")}
        >
          rat portfolio
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("Hi", "font-bold")}
        >
          contact
        </button>
      </div>

     <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <SharkScene />
      </div> 
    </div>
  );
}

export default App;
