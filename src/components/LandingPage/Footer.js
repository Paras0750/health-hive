import React from "react";

const Footer = () => {
  return (
    <footer>
      <div class="about-us">
        <h3>About Us</h3>
        <p>Transforming lives through healthy eating. #eatwelllivebetter</p>
      </div>
      <div class="links">
        <h3>Links</h3>
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
      <div class="follow-us">
        <h3>Follow Us</h3>
        <ul>
          <li>
            <a href="#">
              <i class="fab fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-pinterest"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
