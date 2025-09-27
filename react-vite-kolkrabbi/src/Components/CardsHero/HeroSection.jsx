import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react"

import Button from "../Utility/Button";
import VideoPreview from "../Utility/VideoPreview";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
   const [currentIndex, setCurrentIndex] = useState(1);

   const [isLoading, setIsLoading] = useState(true);
   const [loadedVideos, setLoadedVideos] = useState(0);

   const [isHovering, setIsHovering] = useState(false);

   const totalVideos = 4;
   const miniVdRef = useRef(null);
   const miniVdContainerRef = useRef(null);

   const handleVideoLoad = () => {
      setLoadedVideos((prev) => prev + 1);
   }

   useEffect(() => {
      if (loadedVideos >= 3) {
         setIsLoading(false);
      }
   }, [loadedVideos]);

   // Timeout fallback to ensure loading screen doesn't stick
   useEffect(() => {
      const timeout = setTimeout(() => {
         setIsLoading(false);
      }, 5000); // Force loading to complete after 5 seconds

      return () => clearTimeout(timeout);
   }, []);

   const handleMiniVdClick = () => {
      gsap.to(miniVdContainerRef.current, {
         opacity: 0,
         duration: 0.5,
         ease: 'power2.inOut',
      });

      const nextVideoElement = document.getElementById('next-video');
      const miniVideoElement = miniVdRef.current;

      if (nextVideoElement && miniVideoElement) {

         const onSeeked = () => {
            gsap.set(nextVideoElement, { visibility: "visible" });
            gsap.fromTo(nextVideoElement,
               {
                  width: "16rem",
                  height: "16rem",
               },
               {
                  width: "100%",
                  height: "100%",
                  duration: 1.2,
                  ease: "power2.inOut",
                  onStart: () => {
                     if (nextVideoElement) nextVideoElement.play();
                  },
                  onComplete: () => {
                     setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
                  },
               }
            );
         };

         nextVideoElement.addEventListener('seeked', onSeeked, { once: true });

         const LATENCY_COMPENSATION = 0;
         const currentTime = miniVideoElement.currentTime;
         nextVideoElement.currentTime = currentTime + LATENCY_COMPENSATION;
      }
   };

   useGSAP(() => {
      gsap.set("#next-video", { visibility: "hidden" });
      gsap.set(miniVdContainerRef.current, { scale: 0.5, opacity: 0 });
   }, { dependencies: [currentIndex] });

   // CORRECTED: This hook now controls playback for the mini-video
   useGSAP(() => {
      if (isHovering) {
         // Play the video when the preview appears
         miniVdRef.current?.play();
         gsap.to(miniVdContainerRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut'
         });
      } else {
         // Pause the video when the preview disappears
         miniVdRef.current?.pause();
         gsap.to(miniVdContainerRef.current, {
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
         });
      }
   }, [isHovering]);

   useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
   });

   const getVideoSrc = (index) => `videos/video-${index}.mp4`;

   return (
      <div className="relative h-screen w-screen overflow-x-hidden">

      {isLoading && (
         <div className="flexCenter absolute z-[100] h-screen w-screen overflow-hidden bg-violet-50">
            <div className="three-body">
               <div className="three-body__dot"></div>
               <div className="three-body__dot"></div>
               <div className="three-body__dot"></div>
            </div>
         </div>
      )}

      <div
      id="video-frame"
      className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
         <div>
            <div
               className="mask-clip-path absoluteCenter absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}
            >
               <VideoPreview>
                  <div
                     ref={miniVdContainerRef}
                     onClick={handleMiniVdClick}
                     className="origin-center scale-50 opacity-0"
                  >
                     <video
                        ref={miniVdRef}
                        src={getVideoSrc((currentIndex % totalVideos) + 1)}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        id="mini-video"
                        className="size-64 origin-center scale-150 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                     />
                  </div>
               </VideoPreview>
            </div>

            <video
               src={getVideoSrc((currentIndex % totalVideos) + 1)}
               loop
               muted
               playsInline
               preload="auto"
               id="next-video"
               className="absoluteCenter invisible absolute z-20 size-64 object-cover object-center"
               onLoadedData={handleVideoLoad}
            />

            <video
               src={getVideoSrc(currentIndex)}
               autoPlay
               loop
               muted
               playsInline
               preload="auto"
               id="main-video"
               className="absoluteCenter absolute z-10 size-full object-cover object-center"
               onLoadedData={handleVideoLoad}
            />
         </div>

         <h1 className="heroHeading absolute bottom-5 right-5 z-40 text-blue-100">
            Vinnustofa
         </h1>

         <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
               <h1 className="heroHeading text-blue-100">Kolkrabbi</h1>
               <p className="mb-5 max-w-64 text-2xl font-right-grotesk-medium text-blue-100">Design Studio & Atelier<br />Based in Reykjavík, Iceland</p>

               <Button id="get-in-touch"
               title="Get in Touch"
               leftIcon={<TiLocationArrow />}
               containerClass="!bg-yellow-400 flexCenter gap-1" />
            </div>
         </div>
      </div>

      <h1 className="heroHeading absolute bottom-5 right-5 text-black">Vinnustofa</h1>
      </div>
  )
}

export default Hero