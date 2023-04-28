import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import mealRoutes from "./routes/meal.js";
import { verifyToken } from "./middleware/auth.js";

/* Configurations */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* ROUTES */

app.use("/auth", authRoutes);
app.use("/meal", verifyToken, mealRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Didn't connected : ${error}`);
  });
