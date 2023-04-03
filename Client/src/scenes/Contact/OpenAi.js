import { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import Input from "./Input";

const useOpenAI = (apiKey, prompt, model, healthKeywords) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchResponse = async () => {
      setIsLoading(true);
      setError(null);
      setResponse(null);

      const requestBody = {
        prompt,
        model,
        max_tokens: 1024,
        n: 1,
        stop: "\n",
      };

      try {
        const response = await fetch(
          "https://api.openai.com/v1/engines/davinci-codex/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`,
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch response from OpenAI API.");
        }

        const { choices } = await response.json();
        const { text } = choices[0];

        // Filter out non-health-related responses
        const isHealthRelated = healthKeywords.some((keyword) =>
          text.includes(keyword)
        );
        if (!isHealthRelated) {
          setResponse(null);
          setError(new Error("Error! Ask Me Health-related Questions."));
        } else {
          setResponse(text);
          setError(null);
        }
      } catch (error) {
        setResponse(null);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponse();
  }, [apiKey, prompt, model, healthKeywords]);

  function handleSendMessage(text) {
    // Send message to OpenAI and get response
    if (!isLoading && !error) {
      const response = response || "";

      // Add user message to conversation
      const userMessage = {
        text: text,
        sender: "user",
        timestamp: new Date(),
      };
      setConversation([...conversation, userMessage]);

      // Add OpenAI response to conversation
      const aiMessage = {
        text: response,
        sender: "ai",
        timestamp: new Date(),
      };
      setConversation([...conversation, aiMessage]);
    }
  }
  const conversatio = [
    {
      text: "Hello, I'm a chatbot. Ask me a question!",
      isUser: "true",
      timestamp: new Date(),
    },
    {
      text: "Hello, I'm a chatbot. Ask me a question!",
      isUser: "false",
      timestamp: new Date(),
    },
    {
      text: "Hello, I'm a chatbot. Ask me a question!",
      isUser: "true",
      timestamp: new Date(),
    },
  ];

  return (
    <>
      <h1>AI Chat Bot</h1>
      <div className="chat">
        {conversatio.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <Input onSendMessage={handleSendMessage} />
      </div>
    </>
  );
};

export default useOpenAI;
