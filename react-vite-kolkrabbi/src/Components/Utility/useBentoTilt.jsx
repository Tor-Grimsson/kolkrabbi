// src/hooks/useBentoTilt.js

import { useRef, useState } from "react";

export const useBentoTilt = () => {
   const [transformStyle, setTransformStyle] = useState(''); 
   const itemRef = useRef(null);

   const handleMouseMove = (event) => {
      if(!itemRef.current) return;
      const { left, top, width, height } = itemRef.current.getBoundingClientRect();
      const relativeX = (event.clientX - left) / width;
      const relativeY = (event.clientY - top) / height;
      const tiltX = (relativeY - 0.5) * 5;
      const tiltY = (relativeX - 0.5) * -5;
      const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1, 1, 1)`; // Note: scale is now 1
      setTransformStyle(newTransform);
   };

   const handleMouseLeave = () => {
      setTransformStyle('');
   };

   return {
      ref: itemRef,
      style: { transform: transformStyle, transition: 'transform 0.3s ease-out' },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
   };
};