import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import SharkScene from "./SharkScene";
import ExpandingTextPanel from "./ExpandingTextPanel";
import { useState } from "react";
import About from "./About"; // Import the About page

function Home() {
  const [textConfig, setTextConfig] = useState({
    text: "Hi",
    font: "font-bold"
  });

  // Map texts to their corresponding links
  const linkMap = {
    "5": "https://gencive5.com/",
    "sm00ch": "https://sm00ch.xyz/",
    "": "https://ratfaggotking.fr/"
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

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-100 flex flex-wrap justify-center gap-2 px-4 md:gap-4 md:bottom-18">

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("5", "font-arial5")}
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
          onClick={() => handleTextChange("", "font-sans")}
        >
          rat portfolio
        </button>
        {/* Updated Contact button to navigate to About page */}
        <Link to="/about" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
          Contact
        </Link>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto">
        <SharkScene link={currentLink} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
