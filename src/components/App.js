import React from "react";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WelcomePage from "./WelcomePage";
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";
import Bmi from "./Bmi";
import Recipe from "./Recipe";
import Login from "./Login";
import Register from "./Register";
import PersonalMeal from "./PersonalMeal";
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
