import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

const Agora = () => {
  const [videoCall, setVideoCall] = useState(false);

  const rtcProps = {
    appId: "1febb52632df4ba0a1379d3450774342",
    channel: "test",
    token: null, // enter your channel token as a string
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "80vw", height: "80vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <button onClick={() => setVideoCall(true)}>Join</button>
  );
};

export default Agora;
