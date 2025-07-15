// utils/useScaleFactor.ts
import { useEffect, useState } from "react";

export const useScaleFactor = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = width / height;

      let scaleFactor = 1;
      if (ratio < 1) scaleFactor = 0.9; // Portrait-like
      else if (ratio > 2) scaleFactor = 1.1; // Ultra-wide
      setScale(scaleFactor);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
};
