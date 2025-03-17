import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import SharkScene from "./SharkScene";
import TextPanel from "./TextPanel";
// import ExpandingHi from "./ExpandingHi"; // Corrected import
import { useState } from "react";
// import About from "./About"; // Commented out the About component

function Home() {
  const [textConfig, setTextConfig] = useState({
    text: "Hi",
    font: "font-bold"
  });

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

  const currentLink = linkMap[textConfig.text] || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden overscroll-none">
      <div className="expanding-panel">
        {textConfig.text === "Hi" ? (
          /* <ExpandingHi /> */ // Use ExpandingHi when "Hi" is selected
          null // You can replace this with null or any other placeholder
        ) : (
          <TextPanel 
            textConfig={textConfig} 
            showLink={!!currentLink}
            link={currentLink}        
          />
        )}
      </div>

      <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 z-100 flex flex-wrap justify-center gap-2 px-4 md:gap-4 md:bottom-20">
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
        {/* Commented out the About button */}
        {/* <Link to="/about" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
          About
        </Link> */}
      </div>
      
      <div className="absolute top-[-70px] md:top-0 left-0 w-full h-full z-10 pointer-events-auto">
        <SharkScene link={currentLink} />
      </div>
      
      {/* Fixed footer for email and Instagram */}
      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm z-100">
        <a href="mailto:vic.segen@gmail.com" className="mx-2 hover:underline">Email</a> |
        <a href="https://instagram.com/gencive5" target="_blank" rel="noopener noreferrer" className="mx-2 hover:underline">Instagram</a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Commented out the About route */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;