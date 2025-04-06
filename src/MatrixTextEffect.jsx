import { useEffect } from "react";

export default function MatrixTextEffect({
  text,
  setText,
  fontStyle,
}) {
  useEffect(() => {
    let interval;
    if (["sm00ch", "arial5", "triple"].includes(fontStyle)) {
      interval = setInterval(() => {
        setText((prevText) => {
          // Only proceed if we have at least 2 characters to swap
          if (prevText.length < 2) return prevText;
          
          const textArray = prevText.split("");
          
          // Get two different random indices
          let index1 = Math.floor(Math.random() * textArray.length);
          let index2 = Math.floor(Math.random() * textArray.length);
          while (index2 === index1) {
            index2 = Math.floor(Math.random() * textArray.length);
          }
          
          // Swap the characters
          [textArray[index1], textArray[index2]] = [textArray[index2], textArray[index1]];
          
          return textArray.join("");
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [fontStyle]);

  return null;
}