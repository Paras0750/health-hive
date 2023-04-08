import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

function Banner() {
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#0077FF",
    color: "#FFFFFF",
    borderRadius: "5px",
    textDecoration: "none",
    marginRight: "10px",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div className="banner-container">
      <h1 className="banner-heading">Health-Hive</h1>
      <h2 className="banner-subheading">Contact With Our Expert Dieticians</h2>
      <div className="banner-buttons-container">
        <Link to="/chatBot" style={buttonStyle}>
          Live Chat
        </Link>
        <Link to="/support/videoCall" style={buttonStyle}>
          Live Video Call
        </Link>
      </div>
    </div>
  );
}

export default Banner;
