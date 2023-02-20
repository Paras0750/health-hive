import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div class="navbar-container">
        <div class="navbar-left">
          <a href="#" style={{textDecoration: "none",fontSize: "25px"}}>Health Hive</a>
        </div>
        <div class="navbar-middle">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Foods</a>
            </li>
            <li>
              <a href="#">Diets</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>
        <div class="navbar-right">
          <a href="#" class="button login">
            Login
          </a>
          <a href="#" class="button register">
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
