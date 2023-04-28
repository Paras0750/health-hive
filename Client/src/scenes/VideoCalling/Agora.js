import React, { useEffect, useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Agora = () => {
  const [videoCall, setVideoCall] = useState(true);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const rtcProps = {
    appId: "1febb52632df4ba0a1379d3450774342",
    channel: "test",
    token: null, // enter your channel token as a string
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "80vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#0077FF",
          color: "#FFFFFF",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "16px",
          top: "20%",
          postion: "absolute",
        }}
        onClick={() => setVideoCall(true)}
      >
        Reconnect
      </button>
    </div>
  );
};

export default Agora;
