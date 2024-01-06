import React from "react";
import { navdetails } from "../../constants/NavabrData";
import logoOg from "../../constants/Images/logoOg.png";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";

import { quickLinks, services } from "../../constants/footerData";

const Footer = () => {
  return (
    <footer className="md:flex block text-white justify-between p-8 pb-0">
      <div className="lg:ml-32 md:ml-24 ml-0 flex flex-col">
        <img src={logoOg} className="h-32 w-48" alt="Logo" />
        <div className="w-64 text-tertiary">
          {navdetails.map((data, idx) => (
            <a href={data?.link} key={idx}>
              <div className=" font-bold m-4 mx-0 " key={idx}>
                {data.title === "India" || data.title === "United States" ? (
                  <div className="flex gap-4">
                    <i
                      className={`text-lg ${data.icons} bg-primary text-transparent bg-clip-text text-5xl`}
                    ></i>
                    <div className="hover:text-primary">
                      <p>{data.title}</p>
                      <p className="">{data.details}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <i
                      className={`text-lg ${data.icons} bg-primary text-transparent bg-clip-text text-5xl`}
                    ></i>
                    <p className="hover:text-primary">{data.details}</p>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* quick links  */}
      <div className="flex flex-col gap-3 mt-8 text-tertiary">
        <p className="text-xl font-bold "> Quick Links </p>
        {quickLinks.map((data) => (
          <div className="flex gap-4" key={data.title}>
            <BsArrowRightCircle className="mt-1 text-primary" />
            <Link to="/About" className="hover:text-primary">
              {data.title}
            </Link>
          </div>
        ))}
      </div>

      {/* services  */}
      <div className="flex flex-col gap-3 mt-8 text-tertiary">
        <p className="text-xl font-bold"> Our Services </p>
        {services.map((data) => (
          <div className="flex gap-4" key={data.title}>
            <BsArrowRightCircle className="mt-1 text-primary" />
            <Link to="/Services" className="hover:text-primary">
              {data.title}
            </Link>
          </div>
        ))}
      </div>
    </footer>
  );
};
export default Footer;
