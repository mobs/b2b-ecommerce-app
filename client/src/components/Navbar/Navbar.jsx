import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo } from "../../constants/Images";
import {
  products,
  navdetails,
  Commercial,
  Packaging,
} from "../../constants/NavabrData";
import { signOut } from "../../reducer/apiSlice";
import "./navbar.css";

const Navbar = () => {
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(signOut());
  }

  return (
    <nav className="z-20 border-gray-200 text-tertiary m-0">
      <div className="mt-4 max-w-screen-xl flex flex-wrap items-top justify-between mx-auto p-4 ">
        <Link to="/">
          <img src={logo} className="h-32" alt="Logo" />
        </Link>
        {navdetails.map((d, idx) => (
          <a
            className="lg:block hidden"
            href={d?.link}
            target="_blank"
            key={idx}
          >
            <span className="flex">
              <i
                className={`text-3xl ${d.icons} bg-primary text-transparent bg-clip-text text-5xl`}
              >
                {" "}
              </i>
              <div className="text-base font-bold ml-2 w-32">
                {d.title}
                <div className="text-sm font-normal hover:text-primary text-tertiary">
                  {d.details}
                </div>
              </div>
            </span>
          </a>
        ))}
      </div>

      <hr className="ml-10 mr-10 h-px bg-gray-200 border-0 dark:bg-gray-400" />
      <div className="z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="peer ml-8 mt-4 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="z-30 ml-8 w-screen hidden absolute peer-hover:flex hover:flex flex-col drop-shadow-lg">
          <Link to="/" className="w-48 px-4 py-3 bg-secondary hover:bg-primary">
            {" "}
            Home{" "}
          </Link>

          <Link to="/Products" className="bg-secondary px-4 py-3 w-48 hover:bg-primary">
            <button className="peer w-full flex justify-between items-center">
              Products <i className="ml-4 fa-solid fa-angle-down"></i>
            </button>
            <div className="hidden absolute peer-hover:flex hover:flex flex-col drop-shadow-lg">
              {products.map((prod, idx) => (
                <>
                  {prod.title === "Designing Work" ? (
                    <Link
                      to={`/Products/${encodeURIComponent(prod.title)}`}
                      className="w-56 ml-32 px-4 py-3 bg-secondary hover:bg-primary"
                      href=""
                      key={idx}
                    >
                      {prod.title}
                    </Link>
                  ) : prod.title === "Commercial Printing" ? (
                    <div className="px-4 py-3 bg-secondary hover:bg-primary ml-32">
                      <span className="peer flex justify-between items-center">
                        <button className="peer "> {prod.title} </button>
                        <i className="peer fa-solid fa-angle-right "></i>{" "}
                      </span>
                      <div className="z-30 ml-48 -my-9 w-56 hidden absolute peer-hover:flex hover:flex flex-col  drop-shadow-lg">
                        {Commercial.map((comm, idx) => (
                          <Link
                            to={`/Products/${encodeURIComponent(comm.title)}`}
                            key={idx}
                            className="px-5 py-3 peer w-64 bg-secondary hover:bg-primary"
                          >
                            <button> {comm.title} </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-3 bg-secondary hover:bg-primary ml-32">
                      <span className="peer flex justify-between items-center">
                        <button className="peer"> {prod.title} </button>
                        <i className="peer fa-solid fa-angle-right "></i>{" "}
                      </span>
                      <div className="z-30 ml-48 -my-9 w-56 hidden absolute peer-hover:flex hover:flex flex-col  drop-shadow-lg">
                        {Packaging.map((pack, idx) => (
                          <Link
                            to={`/Products/${encodeURIComponent(pack.title)}`}
                            key={idx}
                            className="px-5 py-3 peer w-64 bg-secondary hover:bg-primary"
                          >
                            <button> {pack.title} </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </Link>

          <Link to="/Services" className="w-48 px-4 py-3 bg-secondary hover:bg-primary">
            <button> Services</button>
          </Link>
          <Link to="/About" className="w-48 px-4 py-3 bg-secondary hover:bg-primary">
            <button className="peer"> About Us</button>
          </Link>
          <Link to="/Gallery" className="w-48 px-4 py-3 bg-secondary hover:bg-primary">
            {" "}
            Gallery{" "}
          </Link>
          <Link to="/Contact" className="w-48 px-4 py-3 bg-secondary hover:bg-primary">
            <button>Contact Us</button>
          </Link>
        </div>
      </div>

      <div
        className="max-w-screen-xl lg:flex flex-wrap items-center justify-between mx-auto p-4"
        id="navbar-default"
      >
        <ul className="lg:flex hidden font-medium flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:border-0">
          <Link to="/">
            <li className="hover:text-primary block py-2 pl-3 pr-4  rounded">
              HOME
            </li>
          </Link>

          <li className="z-10 block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 ">
            <Link to="/Products">
              <button className="peer px-5 py-2 text-tertiary hover:text-primary">
                PRODUCTS <i className="ml-4 fa-solid fa-angle-down"></i>
              </button>
              <div className="text-tertiary hidden absolute peer-hover:flex hover:flex flex-col drop-shadow-lg bg-secondary">
                {products.map((prod, idx) => (
                  <Link
                    to={`/Products/${encodeURIComponent(prod.title)}`}
                    className="px-5 py-3 hover:bg-primary "
                    href=""
                    key={idx}
                  >
                    {prod.title}
                  </Link>
                ))}
                {/* {products.map((prod, idx) => (
                  <>
                    {prod.title === "Designing Work" ? (
                      <Link
                        to={`/Products/${encodeURIComponent(prod.title)}`}
                        className="px-5 py-3 hover:bg-primary "
                        href=""
                        key={idx}
                      >
                        {prod.title}
                      </Link>
                    ) : prod.title === "Commercial Printing" ? (
                      <Link
                        to={`/Products/${encodeURIComponent(prod.title)}`}
                        className="px-5 py-3 hover:bg-primary"
                      >
                        <span className="peer flex justify-between w-48"> 
                        <button className=""> {prod.title} </button>
                        <i className="  fa-solid fa-angle-right py-2"></i></span>
                        <div className="z-30 ml-48 -my-9 w-64 hidden absolute peer-hover:flex hover:flex flex-col drop-shadow-lg bg-secondary">
                          {Commercial.map((comm, idx) => (
                            <Link
                              to={`/Products/${encodeURIComponent(comm.title)}`}
                              key={idx}
                              className="px-5 py-3 w-64 hover:bg-primary"
                            >
                              <button> {comm.title} </button>
                            </Link>
                          ))}
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to={`/Products/${encodeURIComponent(prod.title)}`}
                        className="px-5 py-3 hover:bg-primary"
                      >
                        <span className="peer flex justify-between w-48"> 
                        <button className="peer"> {prod.title} </button>
                        <i className="peer  fa-solid fa-angle-right py-2"></i></span>
                        <div className="z-30 ml-48 -my-9 w-56 hidden absolute peer-hover:flex hover:flex flex-col drop-shadow-lg bg-secondary">
                          {Packaging.map((pack, idx) => (
                            <Link
                              to={`/Products/${encodeURIComponent(pack.title)}`}
                              key={idx}
                              className="px-5 py-3 peer hover:bg-primary"
                            >
                              <button> {pack.title} </button>
                            </Link>
                          ))}
                        </div>
                      </Link>
                    )}
                  </>
                ))} */}
              </div>
            </Link>
          </li>
          <li className="z-10 block py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-blue-700 md:p-0  ">
            <Link to="/Services">
              <button className="peer px-5 py-2 text-tertiary hover:text-primary">
                {" "}
                SERVICES
              </button>
            </Link>
          </li>
          <li className="block z-10 py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-blue-700 md:p-0">
            <Link to="/About">
              <button className="peer px-5 py-2 text-tertiary  hover:text-primary">
                {" "}
                ABOUT US
              </button>
            </Link>
          </li>
          <Link to="/Gallery">
            <li className="block py-3 mt-2 pl-3 pr-4 rounded hover:text-primary md:border-0 md:p-0 ">
              GALLERY
            </li>
          </Link>
          <li className="z-10 block py-2 pl-3 pr-4 roundedmd:border-0 md:hover:text-blue-700 md:p-0">
            <Link to="/Contact">
              <button className="px-5 py-2 text-tertiary hover:text-primary">
                CONTACT US
              </button>
            </Link>
          </li>
          <li></li>
        </ul>

        {user ? (
          <div className="flex gap-2">
            <Link
              to="/Profile"
              className="flex gap-4 items-center p-2 px-8 rounded-xl shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)] hover:text-primary"
            >
              <img src={user?.avatar} className="h-8 w-8 rounded-full" />
              <div>
                <p> Welcome!!! </p>
                <span className="font-bold">
                  {" "}
                  {user?.fullname.toUpperCase()}{" "}
                </span>
              </div>
            </Link>
            <button onClick={() => handleLogout()} className="h-12 mt-2 p-4 py-2 bg-primary text-tertiary rounded hover:text-secondary">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/SignIn">
            <button className="p-4 py-2 bg-primary text-tertiary rounded hover:text-secondary">
              SIGN IN
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
