import AgoraUIKit from "agora-react-uikit";
import { Box } from "@mui/system";
import React from "react";
import Agora from "../VideoCalling/Agora";

const Contact = () => {
  return (
    <div>
      <Box sx={{ padding: "50px 60px" }}>
        <Agora />
      </Box>
    </div>
  );
};

export default Contact;
