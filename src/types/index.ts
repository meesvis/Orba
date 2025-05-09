export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string | null;
  strategy: string;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentId?: string;
}

export interface TokenDistribution {
  category: string;
  percentage: number;
  description: string;
  color: string;
}