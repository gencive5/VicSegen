import { useEffect, useState, useRef } from "react";
import ExpandingHi from "./ExpandingHi";

export default function TextPanel({ textConfig }) {
  const { text, font } = textConfig;
  const [preloadedText, setPreloadedText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);
  const hiddenTextRef = useRef(null);

  const generateRandomText = (length) => {
    const chars =
      text === "5"
        ? "555ssssSS"
        : text === "sm00ch"
        ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
  };

  useEffect(() => {
    if (text === "Hi") return;

    const preloadText = () => {
      if (!containerRef.current || !hiddenTextRef.current) return;

      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 768;
      const baseFontSize = isMobile ? (text === "sm00ch" ? 16 : 12) : 9; // Larger size for sm00ch on mobile

      let initialLength = text === "sm00ch" ? 500 : 1000;
      let tempText = generateRandomText(initialLength);

      hiddenTextRef.current.textContent = tempText;
      hiddenTextRef.current.style.fontSize = `${baseFontSize}vw`;

      let textHeight = hiddenTextRef.current.scrollHeight;
      const containerHeight = containerRef.current.clientHeight;

      while (textHeight > containerHeight && tempText.length > 0) {
        tempText = tempText.slice(0, -1);
        hiddenTextRef.current.textContent = tempText;
        textHeight = hiddenTextRef.current.scrollHeight;
      }

      setPreloadedText(tempText);
      setTimeout(() => setIsReady(true), 50);
    };

    preloadText();
    window.addEventListener("resize", preloadText);

    return () => window.removeEventListener("resize", preloadText);
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full p-6 pb-12 overflow-hidden relative flex items-center justify-center z-5">
      {text === "Hi" ? (
        <ExpandingHi />
      ) : (
        <>
          <p
            ref={hiddenTextRef}
            className="absolute opacity-0 -z-50"
            style={{
              whiteSpace: "pre-wrap",
              maxWidth: "100%",
              visibility: "hidden",
            }}
          ></p>

          {isReady && (
            text === "" ? (
              <div className="relative w-full h-full">
                {["myriad text-naranja", "mutlu text-bleu", "sword text-rose"].map((fontClass, index) => (
                  <p
                    key={index}
                    className={`absolute text-center font-${fontClass} leading-none`}
                    style={{
                      fontSize: "9vw",
                      transform: index === 0 ? "translate(2px, 2px)" : index === 1 ? "translate(-2px, -2px)" : "none",
                      zIndex: index + 1,
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      opacity: 1,
                      visibility: "visible",
                      transition: "opacity 0.1s ease-in-out",
                    }}
                  >
                    {preloadedText}
                  </p>
                ))}
              </div>
            ) : (
              <p
                className={`text-[${window.innerWidth < 768 && text === "sm00ch" ? "16vw" : "9vw"}] leading-none text-center break-words z-50 ${font}`}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  opacity: 1,
                  visibility: "visible",
                  transition: "opacity 0.1s ease-in-out",
                }}
              >
                {preloadedText}
              </p>
            )
          )}
        </>
      )}
    </div>
  );
}
