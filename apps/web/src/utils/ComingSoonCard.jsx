import { TiLocationArrow } from "react-icons/ti";
import { useBentoTilt } from "@hooks/useBentoTilt";

const ComingSoonCard = ({ className = "", ...rest }) => {

   // 1. Call the hook to get the tilt props
  const tiltProps = useBentoTilt();
  

  return (
    // 2. Spread the props onto your div
    <div 
      {...tiltProps} 
      className={`bentoItem col-span-1 row-span-1 flex size-full flex-col justify-between bg-violet-300 p-5 rounded-md overflow-hidden ${className}`}
      {...rest}
    >
      <h1 className="bentoTitle max-w-64 text-black">
        M<b>o</b>re coming soon!
      </h1>
      <TiLocationArrow className="m-5 scale-[5] self-end" />
    </div>
  );
};

export default ComingSoonCard