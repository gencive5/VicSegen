import { useEffect, useState, useRef } from "react";

export default function Text() {
  const [displayText, setDisplayText] = useState("");
  const [fontStyle, setFontStyle] = useState("triple");
  const [matrixEffect, setMatrixEffect] = useState(false);
  const containerRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const fonts = {
    triple: ["font-myriad", "font-mutlu", "font-sword"],
    arial5: ["font-arial5", "font-arial5", "font-arial5"],
    sm00ch: ["font-sm00ch", "font-sm00ch", "font-sm00ch"],
  };

  const getRandomLetter = () => {
    if (fontStyle === "arial5") {
      const characters = ["5", "s", "S"];
      return characters[Math.floor(Math.random() * characters.length)];
    } else {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  };

  const checkOverflow = (text) => {
    return textRefs.some((ref) => {
      if (!ref.current || !containerRef.current) return false;
      ref.current.textContent = text;
      const isWidthOverflowing = ref.current.scrollWidth > containerRef.current.clientWidth;
      const isHeightOverflowing = ref.current.scrollHeight > containerRef.current.clientHeight;
      return isWidthOverflowing || isHeightOverflowing;
    });
  };

  const preloadExpansion = () => {
    let text = "";
    while (true) {
      const randomLetter = getRandomLetter();
      const newText = text + randomLetter;

      if (checkOverflow(newText)) {
        break;
      }

      text = newText;
    }
    return text;
  };

  const randomizeLetters = (text) => {
    const textArray = text.split("");
    const numberOfChanges = 1;
    for (let i = 0; i < numberOfChanges; i++) {
      const randomIndex = Math.floor(Math.random() * textArray.length);
      textArray[randomIndex] = getRandomLetter();
    }
    return textArray.join("");
  };

  useEffect(() => {
    let interval;
    if (matrixEffect) {
      interval = setInterval(() => {
        setDisplayText((prevText) => randomizeLetters(prevText));
      }, 2100);
    }
    return () => clearInterval(interval);
  }, [matrixEffect, fontStyle]);

  useEffect(() => {
    // Initial preload of the expansion
    const finalText = preloadExpansion();
    setDisplayText(finalText);

    // Force a recalculation after a short delay to account for font metrics
    const timeoutId = setTimeout(() => {
      const recalculatedText = preloadExpansion();
      setDisplayText(recalculatedText);
    }, 200); // Adjust the delay if needed

    const handleResize = () => {
      const newFinalText = preloadExpansion();
      setDisplayText(newFinalText);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [fontStyle]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 md:p-2 overflow-hidden relative pointer-events-auto">
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={() => setFontStyle("triple")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          rat portfolio
        </button>
        <button
          onClick={() => setFontStyle("arial5")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Arial5
        </button>
        <button
          onClick={() => setFontStyle("sm00ch")}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Sm00ch
        </button>
        <button
          onClick={() => setMatrixEffect((prev) => !prev)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {matrixEffect ? "Stop Matrix" : "Start Matrix"}
        </button>
      </div>

      {textRefs.map((ref, index) => (
        <p
          key={index}
          ref={ref}
          className={`text-[9vw] font-bold leading-none text-left break-words z-0 ${fonts[fontStyle][index]}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
            maxHeight: "100%",
            fontSize: "9vw",
            lineHeight: 1,
            letterSpacing: "0",
          }}
        >
          {displayText}
        </p>
      ))}
    </div>
  );
}