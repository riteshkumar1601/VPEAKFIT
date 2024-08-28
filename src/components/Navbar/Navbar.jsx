import React, { useState } from "react";
import Home from "./Home";
import SignIn from "../Body/SignIn/SignIn";
import MobileNav from "./MobileNav/MobileNav";
import "./Navbar.css";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />

      <nav className="nav-wrapper bg-blue-800">
        <div className="nav-content py-1 justify-between">
          <div className="logo-section flex gap-3">
            <i class="fa-solid fa-dumbbell text-2xl text-white"></i>
            <div className="name text-white font-bold text-2xl">VPeakFit</div>
          </div>
          <ul>
            <li>
              <a className="menu-item text-md flex gap-2" href="">
                <i class="fa-solid fa-house"></i>
                <Home />
              </a>
            </li>
            <li className="flex gap-2">
              <a className="menu-item text-md" href="">
                <i class="fa-solid fa-user"></i>
              </a>
              <a className="menu-item text-md" href="">
                <SignIn />
              </a>
            </li>
            <button
              className="gap-2 contact-btn text-md px-3 py-2 rounded-lg bg-white text-blue-500"
              onClick={() => {}}
            >
              Contact Us
              <i class="fa-solid fa-phone"></i>
            </button>
          </ul>

          <button className="menu-btn " onClick={toggleMenu}>
            <span
              className={"material-symbols-outlined"}
              style={{ fontSize: "2rem" }}
            >
              {openMenu ? "X" : "≡"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
