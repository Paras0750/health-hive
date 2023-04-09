import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Banner = () => {
  const StyledButton = styled(Button)({
    background: "#7C5EB9",
    borderRadius: 30,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(124, 94, 185, .3)",
    margin: "20px",
    "&:hover": {
      background: "#5D3A9B",
      boxShadow: "0 3px 5px 2px rgba(93, 58, 155, .3)",
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "100px",
        padding: "80px",
        backgroundColor: "#F8F8F8",
      }}
    >
      <Typography variant="h2" color="#292929" margin={10} fontWeight={700} textAlign="center">
        Your Personalized Meal Planner
      </Typography>
      <Typography variant="h6" color="#666666" textAlign="center" maxWidth={800}>
        HealthHive's meal planner removes the stress of planning your healthy meals. Just input your info and start enjoying the food you love. Each meal is customized to your body, selected diet style, your allergies, and your preferences. We automatically track calories and macros so you don't have to!
      </Typography>
      <Typography variant="h5" color="#292929" margin={8} fontWeight={400} textAlign="center">
        Get answers to all your diet-related questions with our AI chatbot and live dietician support.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <StyledButton variant="contained">Get Started</StyledButton>
      </Box>
    </div>
  );
};

export default Banner;
