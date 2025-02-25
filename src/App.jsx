import { useState } from 'react';
import './styles.css';
import SharkScene from "./SharkScene";
import ExpandingTextPanel from "./ExpandingTextPanel";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Expanding text as the background (lower z-index) */}
      <ExpandingTextPanel />

      {/* Foreground elements */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
        <SharkScene />
        <h1 className="text-5xl font-bold text-white">Gencives</h1>
      </div>
    </div>
  );
}

export default App;
