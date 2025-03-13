import { useState } from "react";
import ExpandingTextPanel from "./ExpandingTextPanel";

export default function About() {
  const [textConfig, setTextConfig] = useState({
    text: "About",
    font: "font-bold"
  });

  const handleTextChange = (newText, newFont) => {
    setTextConfig({ text: newText, font: newFont });
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center">
      <ExpandingTextPanel textConfig={textConfig} />

      <div className="mt-6 flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("5", "font-arial5")}
        >
          gencive5
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("sm00ch", "font-sm00ch")}
        >
          sm00ch
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => handleTextChange("", "font-sans")}
        >
          rat portfolio
        </button>
      </div>
    </div>
  );
}
