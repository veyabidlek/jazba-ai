import { VscRecord } from "rocketicons/vsc";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
      <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 text-stroke">
        Capture your screen
      </h1>
      <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8 text-stroke">
        Get beautiful notes
      </h1>
      <button className="flex gap-2 items-center w-full justify-center text-center sm:w-[200px] px-8 py-6 bg-white text-black rounded-[999px] font-bold text-lg hover:bg-black hover:text-white border-[1px] border-black transition-all duration-300">
        <VscRecord width="40px" height="40px" />
        Let’s go
      </button>
    </div>
  );
};

export default Hero;
