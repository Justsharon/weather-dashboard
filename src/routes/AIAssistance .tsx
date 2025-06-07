import { useState } from "react";
import { useAI } from "../context/AIContext";
import { askAI } from "../utils/askAI";

const AIAssistance = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const { addMessage } = useAI();

  const handleAsk = async () => {
    const result = await askAI(input);
    setResponse(result);
    addMessage(result);
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Weather Assistant</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Ask me anything about the weather..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ask
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">{response}</div>
    </div>
  );
};

export default AIAssistance;
