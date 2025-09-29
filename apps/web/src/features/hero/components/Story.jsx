import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedTitle from "@components/ui/AnimatedTitle";
import Button from "@components/ui/Button";

const Story = () => {
   const imageRef = useRef(null); // Ref for the image that gets tilted
   const overlayRef = useRef(null); // Ref for the overlay that has the mask

   useLayoutEffect(() => {
      // Set initial flat rotation for the image
      gsap.set(imageRef.current, { rotateX: 0, rotateY: 0, transformPerspective: 500 });
      // Set initial centered position for the mask on the overlay
      gsap.set(overlayRef.current, { '--x': '50%', '--y': '50%' });
   }, []);

   const handleMouseLeave = () => {
      // Reset the image rotation
      gsap.to(imageRef.current, {
         duration: 0.5, 
         rotateX: 0, 
         rotateY: 0, 
         ease: 'power1.inOut'  
      });
   };

   // This is the updated function to handle both mouse and touch events
   const handleMove = (e) => {
      const imageEl = imageRef.current;
      const overlayEl = overlayRef.current;
      if (!imageEl || !overlayEl) return;

      // Determine if it's a touch event and get the coordinates
      const isTouchEvent = e.type.startsWith('touch');
      const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
      const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Update the mask position on the overlay
      gsap.set(overlayEl, {
        '--x': `${x}px`,
        '--y': `${y}px`,
      });

      // Update the 3D tilt on the image
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      gsap.to(imageEl, {
         duration: 0.5, 
         rotateX, 
         rotateY, 
         ease: 'power1.out'
      });
   };

  return (
    <section id="type" className='relative min-h-dvh w-screen bg-black text-blue-50'>
      <div className='flex size-full flex-col items-center pb-24'>
         <p className='font-right-grotesk-tight text-2xl/6 uppercase md:text-4xl'>Type Design</p>
         <AnimatedTitle 
            title="Develop a sleek &<br />timeless brand identity"
            sectionId="#story"
            containerClass="my-10 pointer-events-none mix-blend-difference relative z-10"
         />
         <div className='storyImgContainer'>
            {/* This outer div handles mouse and touch events */}
            <div 
               className="relative w-full max-w-2xl mx-auto aspect-[4/5]"
               onMouseMove={handleMove}
               onTouchMove={handleMove}
               onMouseLeave={handleMouseLeave}
               onTouchEnd={handleMouseLeave}
            >
              {/* Layer 1: The Image (gets transformed) */}
              <img
                ref={imageRef}
                src="/img/trollatunga-2.png"
                alt="Story"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Layer 2: The Overlay (gets the moving mask) */}
              <div ref={overlayRef} className="storyOverlay" />
            </div>
         </div>
      </div>
      <div className='relative w-full bottom-24  px-12 md:px-24 md:absolute md:right-0 md:max-w-md md:ml-auto'>
        <div className='flex h-full w-full flex-col items-center md:items-start md:w-fit'>
           <p className='mt-3 text-center font-right-grotesk-medium text-lg/6 text-violet-50 md:text-start'>Visual language, defined by a set of foundational principles; from logo design and it’s usage in various formats, to typography selection and style definition, color system and the methodology behind brand palettes, to the guidelines which document and communicate these systems and concepts.</p>
           <Button id="type-button" title="To foundry" containerClass="mt-5" />
        </div>
      </div>
    </section>
  )
}

export default Story;