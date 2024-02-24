import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import SignIn from "./components/SignIn/SignIn";

import "./App.css";
import { fetchProducts, persistLogin } from "./reducer/apiSlice";
import Profile from "./components/Profile/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    dispatch(persistLogin())
  }, [])

  return (
    <div className="font-nunito">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Products/:category?" element={<Product />} />
          <Route path="/Services" element={<Services />} />
          <Route path="About" element={<About />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
