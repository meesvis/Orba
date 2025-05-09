import React from 'react';
import { Bot, ChevronRight, BarChart3, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Agent } from '../../types';
import { timeAgo, truncateText } from '../../utils/helpers';
import { useAgents } from '../../context/AgentContext';
import { useNavigate } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { setActiveAgent } = useAgents();
  const navigate = useNavigate();
  
  const handleChatClick = () => {
    setActiveAgent(agent.id);
    navigate(`/chat/${agent.id}`);
  };
  
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-900/30 border-green-500/30 text-green-500';
      case 'medium':
        return 'bg-yellow-900/30 border-yellow-500/30 text-yellow-500';
      case 'high':
        return 'bg-red-900/30 border-red-500/30 text-red-500';
      default:
        return 'bg-gray-900/30 border-gray-500/30 text-gray-500';
    }
  };
  
  return (
    <Card 
      glassEffect 
      hoverEffect
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {/* Agent header with avatar and risk badge */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 rounded-full overflow-hidden mr-3 border-2 border-green-500/30">
            {agent.avatar ? (
              <img src={agent.avatar} alt={agent.name} className="w-12 h-12 object-cover" />
            ) : (
              <div className="w-12 h-12 bg-gray-800 flex items-center justify-center">
                <Bot size={24} className="text-green-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{agent.name}</h3>
            <div className="flex items-center mt-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getRiskBadgeColor(agent.riskLevel)}`}>
                {agent.riskLevel === 'high' && <AlertTriangle size={12} className="mr-1" />}
                {agent.riskLevel.charAt(0).toUpperCase() + agent.riskLevel.slice(1)} Risk
              </span>
              <span className="text-xs text-gray-500 ml-2">Created {timeAgo(agent.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {/* Agent description */}
        <p className="text-gray-400 mb-4 flex-grow">
          {truncateText(agent.description, 120)}
        </p>
        
        {/* Strategy highlight */}
        <div className="bg-gray-800 p-3 rounded-md mb-4 flex items-start">
          <BarChart3 size={18} className="text-green-400 mr-2 mt-0.5" />
          <div>
            <div className="text-xs text-gray-400 mb-1">Trading Strategy</div>
            <div className="text-sm text-white">{agent.strategy}</div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-auto">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={handleChatClick}
            rightIcon={<ChevronRight size={16} />}
          >
            Chat with Agent
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AgentCard;