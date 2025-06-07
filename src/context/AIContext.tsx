// context/AIContext.tsx
import { createContext, useContext, useState } from "react";

const AIContext = createContext<any>(null);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const [aiHistory, setAIHistory] = useState<string[]>([]);

  const addMessage = (msg: string) => setAIHistory(prev => [...prev, msg]);

  return (
    <AIContext.Provider value={{ aiHistory, addMessage }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);
