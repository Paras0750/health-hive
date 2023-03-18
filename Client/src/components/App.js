import React from "react";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "../scenes/NavBar/Navbar";
import WelcomePage from "../scenes/HomePage/WelcomePage";
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";
import Bmi from "../scenes/BMIPage/Bmi";
import Recipe from "../scenes/RecipePage/Recipe";
import Login from "../scenes/Login/Login";
import Register from "../scenes/Register/Register";
import PersonalMeal from "../scenes/PersonalMealPage/PersonalMeal";
// import MouseTracker from "./Test";

function App() {
  return (<>
    {/* <MouseTracker /> */}
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/analysis" element={<Recipe />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meal" element={<PersonalMeal />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}


export default App;
