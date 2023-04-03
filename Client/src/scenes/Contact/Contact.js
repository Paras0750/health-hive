import { Box } from "@mui/system";
import React from "react";
import OpenAiQA from "./OpenAi";

const Contact = () => {
  return (
    <div>
      <Box sx={{padding: "50px 60px"}}>
        <OpenAiQA />
      </Box>
    </div>
  );
};

export default Contact;
