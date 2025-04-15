import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import "./styles.css";
import Contact from "./Contact";

const Text = lazy(() => import("./Text"));

function Home() {
  const [activeFont, setActiveFont] = useState("hiiii"); 

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

      <Contact /> 
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