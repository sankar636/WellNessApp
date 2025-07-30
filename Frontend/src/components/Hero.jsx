import React from "react";

const Hero = () => {

    return (
        <>
            <div className={`flex flex-col items-start justify-center ps-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/HeroImage.jpg')] bg-no-repeat bg-cover bg-center h-screen`}>
                <p className="bg-[#4CAF50] rounded-full px-4 py-1 text-white text-sm">Embrace Your Inner Peace</p>
                <p className="text-2xl md:text-5xl md:leading-[56px] max-w-xl font-bold md:font-extrabold mt-4">
                    Begin Your Journey to Mindful Living
                </p>
                <p className="max-w-130 mt-2 mb-4 text-sm md:text-base">
                    Transform your life with guided yoga, meditation, and wellness retreats tailored to your soul. Breathe deeply and start today.
                </p>
            </div>

        </>
    );
}

export default Hero