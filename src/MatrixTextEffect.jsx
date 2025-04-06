import { useEffect } from "react";

export default function MatrixTextEffect({
  text,
  setText,
  fontStyle,
  getRandomLetter,
  textRef,
  maxLineCount
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

        // Highlight overflow lines if maxLineCount is set
        if (maxLineCount && textRef.current) {
          highlightOverflowLines(textRef.current, maxLineCount);
        }
      }, 600);
    }
    return () => clearInterval(interval);
  }, [fontStyle, maxLineCount, textRef]);

  return null;
}

function highlightOverflowLines(element, maxLines) {
  // Clear previous highlights
  const oldHighlights = element.querySelectorAll('.overflow-line');
  oldHighlights.forEach(el => {
    el.replaceWith(el.textContent);
  });

  const range = document.createRange();
  range.selectNodeContents(element);
  const rects = range.getClientRects();

  // Only highlight if we exceed max lines
  if (rects.length <= maxLines) return;

  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let lineIndex = 0;
  let currentNode = walker.nextNode();

  while (currentNode && lineIndex < rects.length) {
    if (lineIndex >= maxLines) {
      const lineTop = rects[lineIndex].top;
      const lineBottom = rects[lineIndex].bottom;
      
      // Find characters in this line
      for (let i = 0; i < currentNode.length; i++) {
        range.setStart(currentNode, i);
        range.setEnd(currentNode, i + 1);
        const charRect = range.getBoundingClientRect();
        
        if (charRect.top >= lineTop && charRect.bottom <= lineBottom) {
          // Found start of line
          const start = i;
          let end = i;
          
          // Find end of line
          for (let j = i; j < currentNode.length; j++) {
            range.setStart(currentNode, j);
            range.setEnd(currentNode, j + 1);
            const nextRect = range.getBoundingClientRect();
            if (nextRect.top > lineBottom) break;
            end = j;
          }
          
          // Apply highlight
          const span = document.createElement('span');
          span.className = 'overflow-line';
          range.setStart(currentNode, start);
          range.setEnd(currentNode, end + 1);
          range.surroundContents(span);
          
          i = end; // Skip ahead
        }
      }
    }
    lineIndex++;
    currentNode = walker.nextNode();
  }
}