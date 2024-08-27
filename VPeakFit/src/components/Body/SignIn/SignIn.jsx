import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div>
        <Link to="/signin">Login</Link>
      </div>
    </>
  );
};

export default SignIn;
