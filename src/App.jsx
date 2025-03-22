import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import SharkScene from "./SharkScene";
import Text from "./Text"; // Import the new Text component
import { useState } from "react";

function Home() {
  const [textConfig] = useState({
    text: "Hi",
    font: "font-bold"
  });

  const linkMap = {
    "5": "https://gencive5.com/",
    "sm00ch": "https://sm00ch.xyz/",
    "": "https://ratfaggotking.fr/"
  };

  const currentLink = linkMap[textConfig.text] || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden overscroll-none">
      <div className="expanding-panel">
        {textConfig.text === "Hi" ? (
          <Text /> // Use the new Text component when "Hi" is selected
        ) : (
          <Text /> // Use the Text component for other cases
        )}
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
      </Routes>
    </Router>
  );
}

export default App;