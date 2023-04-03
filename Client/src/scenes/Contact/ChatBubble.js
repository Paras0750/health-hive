import React from "react";
import PropTypes from "prop-types";
import "./ChatBubble.css";

const ChatBubble = ({ text, isUser }) => {
  return (
    <div className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-openai"}`}>
      {text}
    </div>
  );
};

ChatBubble.propTypes = {
  text: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired
};

export default ChatBubble;
