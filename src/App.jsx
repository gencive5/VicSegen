import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
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
      {/* Main content container */}
      <div className="relative w-full h-[calc(100vh-80px)]"> {/* Adjusted height */}
        <div className="w-full h-full">
          <Suspense fallback={<LoadingSpinner />}>
            <Text />
          </Suspense>
        </div>

        {/* SharkScene - unchanged from original */}
        <div className="absolute top-[-70px] md:top-0 left-0 w-full h-full z-10 pointer-events-auto">
          <SharkScene link={currentLink} />
        </div>
      </div>

      {/* Fixed footer with safe area */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-white text-sm z-100 text-center bg-transparent">
        <a href="mailto:vic.segen@gmail.com" className="mx-2 hover:underline">Email</a> |
        <a href="https://instagram.com/gencive5" target="_blank" rel="noopener noreferrer" className="mx-2 hover:underline">Instagram</a>
      </footer>
    </div>
  );
}

function LoadingSpinner() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-50">
      <div className="w-32 h-32 mb-4">
        <SharkScene link={null} />
      </div>
      <span className="text-white text-lg">Loading...</span>
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