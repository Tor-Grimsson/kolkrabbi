import React from 'react';

const ClippedImage = ({ imageUrl, mousePos, size }) => {
  // Default to the center if the mouse position isn't available yet
  const xPos = mousePos?.x ?? size.width / 2;
  const yPos = mousePos?.y ?? size.height / 2;

  return (
    <svg 
      viewBox={`0 0 ${size.width || 1} ${size.height || 1}`} 
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <clipPath id="my-clip-path">
          <path 
            transform={`translate(${xPos - size.width / 2} ${yPos - size.height / 2}) scale(${size.width} ${size.height})`}
            d="M0.95,0.22 C0.97,0.19 0.99,0.2 1,0.23 L0.88,0.84 C0.87,0.87 0.85,0.89 0.82,0.88 L0.1,0.98 C0.07,0.99 0.05,0.97 0.06,0.94 L0.01,0.26 C0,0.23 0.02,0.21 0.05,0.22 L0.95,0.22 Z" 
          />
        </clipPath>
      </defs>

      {/* This is the new part. We apply the clip-path to a foreignObject,
        which contains a standard HTML div with a background image.
        This is the most robust method for clipping HTML with SVG.
      */}
      <foreignObject 
        x="0" 
        y="0" 
        width="100%" 
        height="100%" 
        clip-path="url(#my-clip-path)"
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </foreignObject>
    </svg>
  );
};

export default ClippedImage;