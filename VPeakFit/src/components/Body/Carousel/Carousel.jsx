import React from "react";
import "./Carousel.css";
import VPEAK_Video from "./video/VPEAK_Video.mp4";

const Carousel = () => {
  return (
    <div className="background-container">
      <video autoPlay loop muted id="video">
        <source src={VPEAK_Video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Carousel;
