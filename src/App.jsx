import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SharkScene from "./SharkScene";
import ExpandingTextPanel from "./ExpandingTextPanel";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       
        <SharkScene />
      </div>
      <h1>Gencives</h1>
      <ExpandingTextPanel />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
