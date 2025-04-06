import { useEffect } from "react";

export default function MatrixTextEffect({ 
  text, 
  setText, 
  fontStyle,
  getRandomLetter 
}) {
  useEffect(() => {
    let interval;
    if (["sm00ch", "arial5", "triple"].includes(fontStyle)) {
      interval = setInterval(() => {
        setText((prevText) => {
          const textArray = prevText.split("");
          const randomIndex = Math.floor(Math.random() * textArray.length);
          textArray[randomIndex] = getRandomLetter();
          return textArray.join("");
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [fontStyle, setText, getRandomLetter]);

  return null;
}