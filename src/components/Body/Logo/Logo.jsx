import React from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-content">
      <div>
        <img className="logo" src="./src/assets/logo.jpeg" alt="logo" />
      </div>
      <div className="quotes">
        <h1 className="heading-qh">Indian Dietary guidelines</h1>
        <h4 className="para-qh">
          Advice about the amount and kinds <br /> of foods that we need to eat
          <br /> for helth and welbeings
        </h4>
      </div>
    </div>
  );
};

export default Logo;
