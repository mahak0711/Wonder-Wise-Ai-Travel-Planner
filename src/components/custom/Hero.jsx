import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16 z-[3]">
        <span className="text-white flex flex-col">
          The Future of Travel
          <span>AI Itineraries, Blockchain Security </span>
          <span className="mt-2">
            Welcome to
            <span className="bg-gradient-to-r from-blue-600 via-purple-400 to-cyan-300 ml-3">
              WonderWise.
            </span>
          </span>
        </span>
      </h1>
      <p className="text-white text-2xl font-medium text-center z-[3]">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <a href="/create-trip" className="z-[3]">
        <div className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-md p-1">
          <Button className="bg-white shadow-xl text-black text-xl hover:bg-black hover:text-white border-0 ">
            Get Started, It's Free
          </Button>
        </div>
      </a>
      <img
        src="globe.png"
        className="absolute bottom-0 z-[1] h-[480px] w-[910px]"
      ></img>
     
    </div>
  );
}

export default Hero;