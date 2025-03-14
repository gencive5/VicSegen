import { useEffect, useState } from "react";

export default function ExpandingHi() {
  const [displayText, setDisplayText] = useState("H");
  
  useEffect(() => {
    let text = "H";
    const interval = setInterval(() => {
      if (text.length < 20) { // Adjust max length as needed
        text += "i";
        setDisplayText(text);
      } else {
        clearInterval(interval);
      }
    }, 150); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6 overflow-hidden">
      <p className="text-[9vw] font-bold leading-none text-left break-words">
        {displayText}
      </p>
    </div>
  );
}
