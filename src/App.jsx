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
      {/* Margin-based positioning */}
      <div className="w-full h-[100dvh] flex justify-center mx-auto my-[10vh_auto_10vh]">
        <div className="w-full max-w-[90vw] h-[80dvh]"  style={{
            margin: 'auto auto 16vh', // top | horizontal | bottom
          }}>
          <Suspense fallback={<div className="w-full h-full bg-white" />}>
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