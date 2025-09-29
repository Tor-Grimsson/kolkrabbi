import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const InteractiveImage = ({ imageUrl }) => {
  const svgRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState(null);

  useLayoutEffect(() => {
    const element = svgRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    observer.observe(element);
    gsap.set(element, { rotateX: 0, rotateY: 0, transformPerspective: 500 });
    return () => observer.disconnect();
  }, []);

  const handleMouseLeave = () => {
    gsap.to(svgRef.current, { duration: 0.5, rotateX: 0, rotateY: 0, ease: 'power1.inOut' });
  };

  const handleMouseMove = (e) => {
    const element = svgRef.current;
    if (!element) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    gsap.to(element, { duration: 0.5, rotateX, rotateY, ease: 'power1.out' });
  };

  const xPos = mousePos?.x ?? size.width / 2;
  const yPos = mousePos?.y ?? size.height / 2;

  return (
    <div 
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Blurred background image layer */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* 2. Interactive SVG layer with clip path */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size.width || 1} ${size.height || 1}`}
        className="relative w-full h-full z-10"
      >
        <defs>
          <clipPath id="final-clip-path">
            <path
              transform={`translate(${xPos - size.width / 2} ${yPos - size.height / 2}) scale(${size.width || 1} ${size.height || 1})`}
              d="M.96.217L.855.834a.066.066 0 01-.045.036L.1.96a.065.065 0 01-.06-.028L.015.3a.11.11 0 01.085-.09L.926.19a.065.065 0 01.034.027Z"
            />
          </clipPath>
          <pattern
            id="image-pattern"
            patternUnits="userSpaceOnUse"
            width={size.width || 1}
            height={size.height || 1}
          >
            <image href={imageUrl} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#image-pattern)"
          clip-path="url(#final-clip-path)"
        />
      </svg>
    </div>
  );
};

export default InteractiveImage;