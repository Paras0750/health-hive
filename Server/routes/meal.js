import express from "express";
import { searchRecipe, askGPT, findRecipes, getRecipeImage } from "../controllers/meal.js";
import { weekPlan, allMealPlans, createWeekPlan, saveWeekPlan } from "../controllers/weekPlan.js";

const router = express.Router();

router.post("/findRecipe", findRecipes);
router.post("/recipeSearch", searchRecipe);
router.post("/recipeImage/:id", getRecipeImage);


router.post("/generateMeal", createWeekPlan);
router.post("/saveMeal", saveWeekPlan);

// router.post("/generateMeal", generateMeal);
router.post("/askAI", askGPT);
router.post("/weekPlan", weekPlan);
router.post("/allMealPlans", allMealPlans);

export default router;
