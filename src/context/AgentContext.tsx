import React, { createContext, useContext, useState, useEffect } from 'react';
import { Agent, ChatMessage } from '../types';
import { generateUniqueId } from '../utils/helpers';
import Groq from 'groq-sdk';

interface AgentContextType {
  agents: Agent[];
  activeAgent: Agent | null;
  createAgent: (agent: Omit<Agent, 'id' | 'createdAt'>) => void;
  setActiveAgent: (agentId: string | null) => void;
  messages: Record<string, ChatMessage[]>;
  addMessage: (agentId: string, content: string, sender: 'user' | 'agent') => void;
  isLoading: boolean;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

// Initialize Groq client
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const INTRODUCTION_AGENT_ID = 'introduction-agent';

  // Load agents from localStorage on mount
  useEffect(() => {
    let loadedAgents: Agent[] = [];
    const savedAgents = localStorage.getItem('aora-agents');
    if (savedAgents) {
      const parsedAgents = JSON.parse(savedAgents);
      loadedAgents = parsedAgents.map((agent: any) => ({
        ...agent,
        createdAt: new Date(agent.createdAt)
      }));
    }

    // Check if Introduction Agent exists, if not, add it
    const introAgentExists = loadedAgents.some(agent => agent.id === INTRODUCTION_AGENT_ID);
    if (!introAgentExists) {
      const introductionAgent: Agent = {
        id: INTRODUCTION_AGENT_ID,
        name: 'Aora Guide',
        description: 'Your friendly guide to Aora, memecoins, and trading strategies. Ask me anything!',
        avatar: null, // Will use the default Bot icon
        strategy: 'Informational and educational. I do not execute trades.',
        riskLevel: 'low',
        createdAt: new Date(),
      };
      loadedAgents.unshift(introductionAgent); // Add to the beginning of the list
    }
    setAgents(loadedAgents);
    
    const savedMessages = localStorage.getItem('aora-messages');
    let loadedMessages: Record<string, ChatMessage[]> = {};
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      Object.keys(parsedMessages).forEach(agentId => {
        parsedMessages[agentId] = parsedMessages[agentId].map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      });
      loadedMessages = parsedMessages;
    }

    // Ensure messages for Introduction Agent are initialized
    if (!loadedMessages[INTRODUCTION_AGENT_ID]) {
      loadedMessages[INTRODUCTION_AGENT_ID] = [];
    }
    setMessages(loadedMessages);

  }, []);

  // Save agents to localStorage when updated
  useEffect(() => {
    if (agents.length > 0) {
      localStorage.setItem('aora-agents', JSON.stringify(agents));
    }
  }, [agents]);

  // Save messages to localStorage when updated
  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      localStorage.setItem('aora-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const createAgent = (agentData: Omit<Agent, 'id' | 'createdAt'>) => {
    const newAgent: Agent = {
      ...agentData,
      id: generateUniqueId(),
      createdAt: new Date()
    };
    
    setAgents(prev => [...prev, newAgent]);
    setMessages(prev => ({ ...prev, [newAgent.id]: [] }));
    return newAgent;
  };

  const handleSetActiveAgent = (agentId: string | null) => {
    if (agentId === null) {
      setActiveAgent(null);
      return;
    }
    
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setActiveAgent(agent);
    }
  };

  const addMessage = async (agentId: string, content: string, sender: 'user' | 'agent') => {
    const newMessage: ChatMessage = {
      id: generateUniqueId(),
      content,
      sender,
      timestamp: new Date(),
      agentId
    };

    // Update messages state with the new message
    setMessages(prev => {
      const agentMessages = prev[agentId] || [];
      return {
        ...prev,
        [agentId]: [...agentMessages, newMessage]
      };
    });

    // If user sent a message, generate agent response using Groq
    if (sender === 'user') {
      setIsLoading(true);
      
      const agent = agents.find(a => a.id === agentId);
      
      try {
        // Build conversation history for context
        const conversationHistory = messages[agentId] || [];
        const lastMessages = conversationHistory.slice(-5); // Get last 5 messages for context
        
        const systemPrompt = `You are ${agent?.name}, an AI trading agent for Solana memecoins with a ${agent?.riskLevel} risk profile. Your strategy is: ${agent?.strategy}. Your personality is: ${agent?.description}

Respond as a trading agent, providing analysis and insights about Solana memecoins. Keep responses concise and focused on trading.

Current market conditions: You're monitoring multiple Solana memecoin pairs and analyzing their trading patterns.`;

        const conversation = lastMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

        // Call Groq API
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversation,
            { role: 'user', content }
          ],
          model: 'llama3-70b-8192',
          temperature: 0.7,
          max_tokens: 500,
          top_p: 1,
          stream: false
        });

        const agentResponse = completion.choices[0]?.message?.content || 
          "I apologize, but I'm having trouble analyzing the market right now. Please try again.";
        
        // Add agent response
        addMessage(agentId, agentResponse, 'agent');
      } catch (error) {
        console.error('Error generating agent response:', error);
        addMessage(agentId, "Sorry, I'm having trouble connecting to the trading network right now. Please try again later.", 'agent');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AgentContext.Provider value={{
      agents,
      activeAgent,
      createAgent,
      setActiveAgent: handleSetActiveAgent,
      messages,
      addMessage,
      isLoading
    }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};