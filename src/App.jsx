import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react"; // Import useEffect
import "./styles.css";
import SharkScene from "./SharkScene";

// Lazy load the Text component
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
    <div className="relative w-screen h-screen overflow-hidden overscroll-none">
      <div className="w-full h-[85vh] md:h-[90vh]">
        {/* Use Suspense to show a fallback while Text is loading */}
        <Suspense fallback={<LoadingSpinner />}>
          <Text /> {/* The Text component is loaded asynchronously */}
        </Suspense>
      </div>

      <div className="absolute top-[-70px] md:top-0 left-0 w-full h-full z-10 pointer-events-auto">
        <SharkScene link={currentLink} /> {/* Spinning shark animation */}
      </div>

      {/* Fixed footer for email and Instagram */}
      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm z-100">
        <a href="mailto:vic.segen@gmail.com" className="mx-2 hover:underline">Email</a> |
        <a href="https://instagram.com/gencive5" target="_blank" rel="noopener noreferrer" className="mx-2 hover:underline">Instagram</a>
      </footer>
    </div>
  );
}

function LoadingSpinner() {
  const [showLoading, setShowLoading] = useState(false);

  // Add an artificial delay to show the loading state for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 100); // Delay the loading state by 100ms to ensure it's visible
    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null; // Don't show anything until the delay is over
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-50">
      <div className="w-32 h-32 mb-4">
        <SharkScene link={null} /> {/* Spinning shark animation */}
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