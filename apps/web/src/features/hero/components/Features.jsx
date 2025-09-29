import { useBentoTilt } from "@hooks/useBentoTilt";
import ComingSoonCard from "@utils/ComingSoonCard";

// Bento Card Component accepts these properties, ...rest is f.e. id
const BentoCard = ({ 
   src, 
   title, 
   description,
   alignRight = false, 
   className = "", ...rest }) => {

   // link to useBentoTilt Component
   const tiltProps = useBentoTilt();
   

   return (
      <div className={`relative ${alignRight ? 'ms-auto' : 'size-full'} ${className}`} {...tiltProps} {...rest}>
         <video
            src={src}
            loop
            muted
            autoPlay
            playsInline
            webkit-playsinline
            className="absolute left-0 top-0 size-full object-cover object-center rounded-md overflow-hidden"
         />
         <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
            <div>
               <h1 className="bentoTitle">{title}</h1>
               {description && (
                  <p className="font-right-grotesk-medium text-lg/6 mt-1 max-w-64 md:text-base">{description}</p>
               )}
            </div>
         </div>
      </div>
   );
};

// Page content

const Features = () => {
  return (

   // Page Content Container

    <section id="work" className='bg-black pb-20 md:pd-0'>

      {/* // text section */}
      <div className='container mx-auto px-3 md:px-10'>
         <div className='px-5 py-32'>
            <p className='font-right-grotesk-medium text-3xl text-blue-50'>
               Selected Work</p>
         
         <p className="max-w-md mt-2 font-right-grotesk-medium text-lg/6 text-blue-50 opacity-80">
            Develop a sleek and timeless brand identity, with a story that reflects your values, a message that aligns with your audience, and a strategy to operate—tailored fitted to the core of your brand.
         </p>
         </div>
      
   {/* // Bento Cards */}

         <BentoCard
            className="bentoItem relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
            src="videos/videofeat-3.mp4"
            title={<>Tröllatunga</>}
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into arewarding adventure."
         />

   {/* // Bento Card Container */}

         <div className="grid h-[135vh] grid-cols-2 grid-rows-4 gap-7">


            <BentoCard 
               className="bentoItem col-span-2 md:col-span-1 rounded-md overflow-hidden md:row-span-2"
               src="videos/videofeat-1.mp4"
               title={<>Flaður</>}
               description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
            

            <BentoCard
               className="bentoItem col-span-2 row-span-1 ms-32 rounded-md overflow-hidden md:col-span-1"
               src="videos/videofeat-2.mp4"
               title={<>Silfurbarki</>}
               description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
               id="silfurbarki"
            />

            
            <BentoCard
               className="bentoItem col-span-2 row-span-1 h-full w-[calc(100%-8rem)] me-32 rounded-md overflow-hidden md:col-span-1"
               src="videos/videofeat-4.mp4"
               title={<>Gullhamrar</>}
               description="A gamified soical hub, adding a new dimension of play to social interaction for Web3 communities"
               alignRight={true}
            />
            
            {/* // Link to Coming Soon Card */}

            <ComingSoonCard
               className="col-span-1 row-span-1 md:col-span-1 md:row-span-2"
            />

            <BentoCard
               className="col-span-1 row-span-1 md:col-span-1 md:row-span-2 size-full object-cover object-center rounded-md overflow-hidden"
               src="videos/videofeat-5.mp4"
            />

         </div>
      </div>
    </section>
  )
}

export default Features
