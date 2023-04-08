import express from "express";
import { generateMeal, askGPT } from "../controllers/meal.js"

const router = express.Router();

router.post("/generateMeal", generateMeal);
router.post("/askAI", askGPT);

export default router;
