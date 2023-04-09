import express from "express";
import { generateMeal, askGPT } from "../controllers/meal.js";
import { weekPlan, allMealPlans } from "../controllers/weekPlan.js";

const router = express.Router();

router.post("/generateMeal", generateMeal);
router.post("/askAI", askGPT);
router.post("/weekPlan", weekPlan);
router.post("/allMealPlans", allMealPlans);

export default router;
