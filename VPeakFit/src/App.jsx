import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Navbar/Home";
import Logo from "./components/Body/Logo/Logo";
import Carousel from "./components/Body/Carousel/Carousel";
import Services from "./components/Body/Services/Services";
import UserInjuryInput from "./components/Body/UserInjuryInput/UserInjuryInput";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/Body/SignIn/SignIn";
// import SingUp from "./components/Body/SingUp/SingUp";
import Panel from "./components/Body/Panel/panel";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Logo />
        <Carousel />
        <Panel />
        <Services />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/injury" element={<UserInjuryInput />} />
        </Routes>
        {/* <SignIn /> */}
        {/* <SingUp /> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
