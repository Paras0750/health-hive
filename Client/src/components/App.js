import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "../scenes/Contact/Contact";
import Footer from "./Footer";
import Navbar from "../scenes/NavBar/Navbar";
// import NewNav from "../scenes/NavBar/NewNav";
import WelcomePage from "../scenes/HomePage/WelcomePage";
import Bmi from "../scenes/BMIPage/Bmi";
import Nurtition from "../scenes/NurtitionalAnalysis/NurtitionalAnalysis";
import Login from "../scenes/Login/Login";
import Register from "../scenes/Register/Register";
import PersonalMeal from "../scenes/PersonalMealPage/PersonalMeal";
import Recipe from "../scenes/RecipeManagment/Recipe";
import SingleRecipe from "../scenes/RecipeManagment/SingleRecipe";
import MyMealPlans from "../scenes/MyMealPlans/MyMealPlans";
import MealPlanDetails from "../scenes/MyMealPlans/MealPlanDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/analysis" element={<Nurtition />} />
          <Route path="/meal" element={<PersonalMeal />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipe/:recipeId" element={<SingleRecipe />} />
          <Route path="/support" element={<Contact />} />
          <Route path="/myMealPlans" element={<MyMealPlans />} />
          <Route path="/myMealPlans/:id" element={<MealPlanDetails />} />
          <Route path="/bmi" element={<Bmi />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
