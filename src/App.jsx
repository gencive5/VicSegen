import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import "./styles.css";

const Text = lazy(() => import("./Text"));

function Home() {
  const [activeFont, setActiveFont] = useState("hiiii"); // Default to "hiiii" panel

  const handleInteraction = (font) => {
    setActiveFont(font);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden overscroll-none">
      <div className="relative w-full h-[calc(100svh-80px)] flex items-center justify-center p-2">
        <div className="w-full h-full max-w-[95vw] max-h-[85svh]">
          <Suspense fallback={null}>
            <Text 
              activeFont={activeFont}
              onInteraction={handleInteraction}
            />
          </Suspense>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 py-4 text-white text-sm z-100 text-center bg-transparent">
        <a href="mailto:vic.segen@gmail.com" className="mx-2 hover:underline font-arial">Email</a> |
        <a href="https://instagram.com/gencive5" target="_blank" rel="noopener noreferrer" className="mx-2 hover:underline font-arial">Instagram</a>
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