import React from "react";

const CreateMeal = () => {
  return <div style={{margin: "100px 10px"}}>
    <form >
        <h2>Upgrade your Diet</h2>
        <h3>With Personalized Meal Plans</h3>
        <div>
            <label for="diet">Step 1. Select a diet:</label><br />
            <select id="diet" name="diet" required>
            <option value="">Select a diet</option>
            <option value="1">Vegetarian</option>
            <option value="2">Non-Vegetarian</option>
            <option value="3">Gluten Free</option>
            <option value="4">Ketogenic</option>
            </select>
        </div>
        <div>
            <h4>Step 2. Enter your calories:</h4>
            <label for="calories">Calories:</label>
            <input type="text" id="calories" name="calories" required />
        </div>
        <div>
            <label for="meals">Meals:</label>
            <input type="number" id="meals" name="meals" required />
        </div><br />
        <button type="submit">Submit</button>
    </form>

  </div>;
};

export default CreateMeal;
