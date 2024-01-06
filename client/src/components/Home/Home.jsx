import React, { useState } from "react";

import { features, socials, storeDetails } from "../../constants/homeData";
import { banner2 } from "../../constants/Images";

import NumberCounter from "./Counter";
import Form from "./Form";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="text-tertiary">
      <Carousel />
      {/* carousel ayega */}
      <div className="flex flex-col items-center">
        <p className="font-Sofia absolute font-extrabold md:text-9xl text-5xl opacity-10">
          {" "}
          Features{" "}
        </p>
        <div className="font-Sofia text-center md:mb-12 mb-4 md:text-lg text-xs font-bold text-primary">
          Features
        </div>
        <div className="text-center font-extrabold md:text-5xl text-xl">
          Our Best Features
        </div>
      </div>

      <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 m-8 md:ml-32 md:mr-32">
        {features.map((feat) => (
          <div
            className="flex flex-col gap-1 rounded-xl transition-transform transform-gpu hover:translate-x-0 hover:translate-y-6 duration-500 shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)]"
            key={feat.title}
          >
            <img src={feat.image} className="rounded h-48" />
            <p className="m-4 font-bold text-xl text-primary">{feat.title}</p>
            <p className="m-4 font-light">{feat.content}</p>
          </div>
        ))}
      </div>

      {/* recent works  section */}
      <div className="flex flex-col items-center">
        <p className="font-Sofia absolute font-extrabold md:text-9xl text-5xl opacity-10">
          {" "}
          Projects{" "}
        </p>
        <div className="font-Sofia text-center md:mb-12 mb-4 md:text-lg text-xs font-bold text-primary">
          Recent Works
        </div>
        <div className="text-center font-extrabold md:text-7xl text-xl">
          Our Projects
        </div>
      </div>

      {/* saare products to display krna hai category wise 1st product only */}

      <div className="mt-4 shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(0,0,0,0.2)]">
        <img src={banner2} />
      </div>

      {/* store cusomter satisfaction details */}
      <div className="md:flex justify-between m-16 md:ml-32 md:mr-32 text-primary ">
        {storeDetails.map((detail) => (
          <div
            key={detail.num}
            className="flex flex-col gap-4 p-4 shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)]"
          >
            <detail.icon className="text-center text-6xl m-auto text-tertiary" />
            <NumberCounter num={detail.num} int={detail.inc} />
            <p className="text-2xl "> {detail.title} </p>
          </div>
        ))}
      </div>

      {/* Form and social media links section */}
      <Form />
      <div className="md:flex justify-between text-center ml-24 mr-24">
        {socials.map((social, idx) => {
          return (
            <div
              onClick={() => window.open(social.link, "_blank")}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={idx}
              className="font-semibold w-full p-4 hover:bg-primary rounded-full"
            >
              {hoveredIndex === idx ? (
                <social.icon className="text-2xl text-secondary m-auto" />
              ) : (
                social.title
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
