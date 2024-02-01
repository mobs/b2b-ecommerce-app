import React, { useState } from "react";
import { useSelector } from "react-redux";
import { features, socials, storeDetails } from "../../constants/homeData";
import { banner2 } from "../../constants/Images";

import NumberCounter from "./Counter";
import Form from "../ContactForm/Form"
import Carousel from "../Carousel/Carousel";
import Card from "../Card/Card";

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [displayProducts, setDisplayProducts] = useState({});

  const products = useSelector(state => state.product.products)

  

  return (
    <div className="text-tertiary">
      <Carousel />
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

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 m-8 md:ml-32 md:mr-32 lg:h-[50vh]">
        {features.map((feat) => (
          <Card data={feat} key={feat.title}/>
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
      
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 m-8 md:ml-32 md:mr-32">
          {
            products && products.map((product) => (
              <div key={product._id}>
                <Card data={product} />
              </div>
            )) 
          }
      </div>

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
