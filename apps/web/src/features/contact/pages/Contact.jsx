import React from 'react'
import Button from "@components/ui/Button";

const ImageClipBox = ({ src, clipClass }) => (
   <div className={clipClass}>
      <img src={src} />
   </div>
)

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className='relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden'>
         <div className='absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96'>
            <ImageClipBox
               clipClass="contactClipPath1"
               src="/img/kolk-letter-1.webp"
             />
             <ImageClipBox
               clipClass="contactClipPath2"
               src="/img/kolk-letter-2.webp"
             />
            </div>

            <div className='absolute -top-20 left-60 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80'>
               <ImageClipBox
                  src="/img/kolk-letter-3.webp"
                  clipClass="absolute md:scale-125"
               />
            
            </div>

            <div className='flex flex-col items-center text-center'>
               <p className='font-right-grotesk-medium text-2xl uppercase z-10'>Kolkrabbi Vinnustofa</p>

                  <p className='mt-10 w-full font-right-grotesk-tight uppercase text-6xl leading-[0.9] md:text-[6rem] z-10'>Kolkrabbi Vinnustofa<br />based in Reykjavík
                  </p>
                 
                  <Button title="Get in touch" containerClass="mt-10 cursor-pointer" />
                  
            </div>
         </div>
      </div>
  )
}

export default Contact
