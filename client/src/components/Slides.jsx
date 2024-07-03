import React from "react";

const Slide = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <img
        className="absolute w-full h-full object-cover"
        src="../public/ifgb/slide.jpg"
        alt="Background"
        style={{ opacity: "0.7" }}
      />
      <div className="z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome Home! Anywhere you roam
        </h1>
        <p className="text-xl">Stay in the moment. Make your memories</p>
      </div>
    </div>
  );
};
export default Slide;
