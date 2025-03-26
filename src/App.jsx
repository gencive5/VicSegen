import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import "./styles.css";
import SharkScene from "./SharkScene";

const Text = lazy(() => import("./Text"));

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
    <div className="relative w-full h-screen overflow-hidden overscroll-none">
     
      <div className="relative w-full h-[calc(100svh-80px)] flex items-center justify-center p-2">
       
        <div className="w-full h-full max-w-[95vw] max-h-[85svh]">
          <Suspense fallback={null}> {/* Minimal silent loading */}
            <Text />
          </Suspense>
        </div>

      
        {/* <div className="absolute top-[-70px] md:top-0 left-0 w-full h-full z-10 pointer-events-auto">
          <SharkScene link={currentLink} />
        </div> */}
      </div>

      
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-white text-sm z-100 text-center bg-transparent">
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