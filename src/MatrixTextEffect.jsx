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
          if (prevText.length < 2) return prevText;
          
          const textArray = prevText.split("");
          let index1 = Math.floor(Math.random() * textArray.length);
          let index2 = Math.floor(Math.random() * textArray.length);
          
          while (index2 === index1) {
            index2 = Math.floor(Math.random() * textArray.length);
          }
          
          [textArray[index1], textArray[index2]] = [textArray[index2], textArray[index1]];
          return textArray.join("");
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [fontStyle, setText]);

  return null;
}