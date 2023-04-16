import mongoose from "mongoose";

let User;

try {
  User = mongoose.model("User");
} catch {
  const UserSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      email: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true,
      },
      spoonacularUsername: {
        type: String,
        required: true,
      },
      spoonacularPassword: {
        type: String,
        required: true,
        unique: true,
      },
      spoonacularHash: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  User = mongoose.model("User", UserSchema);
}

export default User;
