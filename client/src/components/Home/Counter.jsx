import React, { useState, useEffect } from "react";

const NumberCounter = ({ num, int }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const incrementCount = () => {
    if (count < num) {
      setCount((prevCount) => prevCount + int);
    }
  };

  useEffect(() => {
    const checkVisibility = () => {
      const element = document.getElementById("counterDiv");
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); 

    if (isVisible && count < num) {
      const interval = setInterval(incrementCount, 100);
      return () => clearInterval(interval); 
    }

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, [isVisible, num, count]);

  return (
    <div id="counterDiv" className="text-center">
      {isVisible && count < num ? (
        <div>
          <p className="text-5xl">{count}</p>
        </div>
      ) : (
        <div>
          <p className="text-5xl">{num}</p>
        </div>
      )}
    </div>
  );
};

export default NumberCounter;
