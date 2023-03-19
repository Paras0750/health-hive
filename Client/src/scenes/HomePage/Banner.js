import React from "react";
import Typography from "@mui/material/Typography";

const Banner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "100px",
        padding: "80px",
      }}
    >
      <Typography variant="h2" color="initial" margin={10} fontWeight={600}>
        Smart Weightloss Meal Planner and More
      </Typography>
      <Typography variant="h6" color="initial">
        Health-Hive's meal planner removes the dread of planning your healthy
        meals. Just input your info and start enjoying the food you love. Each
        meal is customized to your body, selected diet style, your allergies,
        and what foods you love or dislike.
      </Typography>
      <Typography variant="h5" color="initial" margin={8} fontWeight={400}>
        We automatically track calories and macros so you don't have to!
      </Typography>
    </div>
  );
};

export default Banner;
