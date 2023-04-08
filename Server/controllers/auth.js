import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fetch from "node-fetch";

/* REGISTER USER */

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const spoonAuth = {
      username: firstName,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    const spoonResponse = await fetch(
      "https://api.spoonacular.com/users/connect?apiKey=d530179012ee4e238dd9730c30f0783a",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(spoonAuth),
      }
    );
    if (!spoonResponse.ok) {
      throw new Error("Failed to connect to Spoonacular API");
    }
    console.log(spoonResponse);

    const spoonData = await spoonResponse.json();

    console.log(spoonData);

    const { username, spoonacularPassword, hash } = spoonData;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      spoonacularUsername: username,
      spoonacularPassword: spoonacularPassword,
      spoonacularHash: hash,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // status code 201 means something is created
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email: email });

    if (!user) console.log("User Not Found");
    if (!user) return res.status(400).json({ msg: "User dosn't exist " });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
