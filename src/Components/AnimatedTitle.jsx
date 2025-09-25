import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";


// The component accepts two properties (props):
const AnimatedTitle = ({title, containerClass}) => {
   const containerRef = useRef(null);

// This section sets up and controls the animation (GSAP).
// gsap timeline
   useEffect(() => {
      const ctx = gsap.context(() => {
         const titleAnimation = gsap.timeline({
            scrollTrigger: {
               trigger: containerRef.current,
               start: "100 bottom",
               end: "center bottom",
               toggleActions: "play none none reverse",
            },
         });

//  The .to() Animation:
         titleAnimation.to(
            ".animatedWord", 
            {
               opacity: 1,
               transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
               ease: "power2.inOut",
               stagger: 0.02,
            },
            0
         );
      }, containerRef);

      return () => ctx.revert();
   }, []);

// Content Section Parameters
  return (
      <div 
      ref={containerRef}
      className={`animatedTitle ${containerClass}`}>
            {title.split('<br />').map((line, index) => (
               <div 
                  key={index} 
                  className="flexCenter max-w-full flex-wrap gap-2 px-10 md:gap-3">

                  {line.split(" ").map((word, i) => (
                     <span 
                        key={i} 
                        className="animatedWord" 
                        dangerouslySetInnerHTML={{ __html: word }} 
                     />
                  ))}
               </div>
            ))} 
      </div>
  );
};

export default AnimatedTitle;
