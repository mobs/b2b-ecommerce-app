import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import banner2 from "../../constants/Images/banner 2.png";
import { carousel1, carousel2, carousel3} from "../../constants/Images";

const Carousel = () => {
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward


    const data = [
      {
        image: carousel1,
        link: '/Contact'
      },
      {
        image: carousel2,
        link: '/Contact'
      },
      {
        image: carousel3,
        link: '/Contact'
      },
      {
        image: banner2,
        link: '/Products'
      }
    ]
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);
  
    const movePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevState) => prevState - 1);
      }
    };
  
    const moveNext = () => {
        if (
          currentIndex <= 3
        ) {
          setCurrentIndex((prevState) => prevState + 1);
        }
      };
  
    const isDisabled = (direction) => {
      if (direction === "prev") {
        return currentIndex <= 0;
      }
  
      if (direction === "next" && currentIndex >= 3) {
        return (
          carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
        );
      }
  
      return false;
    };
  
    useEffect(() => {
      if (carousel !== null && carousel.current !== null) {
        carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
      }
    }, [currentIndex]);
  
    useEffect(() => {
      maxScrollWidth.current = carousel.current
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : 0;
    }, []);

    useEffect(() => {
      const autoSlideInterval = setInterval(() => {
        if (direction === 1) {
          moveNext();
        } else {
          movePrev();
        }
      }, 15000); // Change slide every 5 seconds (adjust as needed)
  
      return () => {
        clearInterval(autoSlideInterval);
      };
    }, [currentIndex, direction]);
  
    // Toggle the auto slide direction between forward and backward
    useEffect(() => {
      if (currentIndex === 0) {
        setDirection(1); // If at the beginning, switch to forward
      } else if (currentIndex === data.length - 1) {
        setDirection(-1); // If at the end, switch to backward
      }
    }, [currentIndex, data.length]);

  return (
    <div className="carousel my-12 mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="text-secondary w-10  text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={moveNext}
            className="text-secondary w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div
          ref={carousel}
          className=" relative flex gap-5 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >

          {data.map((banner, index) => {
            return (
              <div key={index} 
              className={` relative snap-start slide-animation ${
                index === currentIndex ? "active" : ""
              }`}
              >
                <Link to={banner.link}
                  className="flex bg-origin-padding bg-left-top  bg-no-repeat z-0 w-screen"
                >
                  <img
                    src={banner.image}
                    alt={banner.link}
                    className="lg:h-1/2 md:h-[18rem] h-[18rem]"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
