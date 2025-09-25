import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

// The Animation Logic

const About = () => {
   useGSAP(() => {
      const clipAnimation = gsap.timeline({
         // Timeline
         scrollTrigger: {
            trigger: "#clip",
            start: "center center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
         },
      });

      clipAnimation.to(".mask-clip-path", {
         // Animation Clip Path
         width: "100vw",
         height: "100vh",
         borderRadius: 0,
      });
   });


   // Page Content

  return (
    <div id="studio" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
         {/* // Intro Text */}
         <p className="font-right-grotesk-tight text-2xl
          uppercase md:text-[10px]">
            Kolkrabbi Vinnustofa</p>

         {/* Animated Title Component */}

         <AnimatedTitle 
         title="Design studio & Atelier based in Reykjavík" 
         containerClass="!text-black text-center" />

         {/* Text Section Below */}

         <div className="aboutSubtext text-2xl">
            <p>Design studio & Atelier based in Reykjavík</p>
            <p className="text-gray-500 text-xl">
               Visual language, defined by a set of foundational principles; from logo design and it’s usage in various formats.</p>
         </div>
      </div>

      {/* Image id "clip> link to timeline in Animation Logic" */}
      {/* ".mask-clip-path" link to clip path in Animation Logic */}

      <div className="h-dvh w-screen" id="clip">
         <div className="mask-clip-path aboutImage">
            <img 
               src="/img/kolk-layout-3.webp"
               alt="Background"
               className="absolute left-0 top-0 size-full object-cover"
            />

         </div>

      </div>
    </div>
  );
};

export default About;
