import './styles.css';
import SharkScene from "./SharkScene";
import ExpandingTextPanel from "./ExpandingTextPanel";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Expanding text as the background (lowest z-index) */}
      <ExpandingTextPanel />

      {/* SharkScene - Highest z-index */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
        <SharkScene />
      </div>

      {/* 
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white z-10">
        Gencives
      </h1> */}
    </div>
  );
}

export default App;
