"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-14 left-0 right-0 h-[3px] z-50 bg-warm-border">
      <div
        className="h-full transition-[width] duration-200 ease-out"
        style={{
          width: `${progress}%`,
          background: `var(--color-accent)`,
        }}
      />
    </div>
  );
}
