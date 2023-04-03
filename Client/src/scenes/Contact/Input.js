import { useState } from 'react';

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Input;
