import { useState, useEffect, useRef } from "react";

export default function ExpandingTextPanel() {
  const [text, setText] = useState("Hi");
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        if (scrollWidth <= clientWidth) {
          setText((prev) => prev + "i");
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden text-xl font-bold whitespace-nowrap">
      {text}
    </div>
  );
}
