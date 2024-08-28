import React from "react";
import "./MobileNav.css";

const MobileNav = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <div
        className={`mobile-menu ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="mobile-menu-container">
          <ul>
            <div className="logo-section flex gap-3">
              <i class="fa-solid fa-dumbbell text-2xl text-white"></i>
              <div className="name text-white font-bold text-2xl">VPeakFit</div>
            </div>
            <li>
              <a className="menu-item" href="">
                Home
              </a>
            </li>
            <li>
              <a className="menu-item" href="">
                Login
              </a>
            </li>
            <button className="contact-btn" onClick={() => {}}>
              Contact Us
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
