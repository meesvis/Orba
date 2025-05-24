import React from 'react';
import { Bot, ChevronRight, BarChart3, AlertTriangle, Hexagon } from 'lucide-react';
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
        return 'bg-emerald-900/30 border-emerald-500/30 text-emerald-500';
      case 'medium':
        return 'bg-yellow-900/30 border-yellow-500/30 text-yellow-500';
      case 'high':
        return 'bg-red-900/30 border-red-500/30 text-red-500';
      default:
        return 'bg-gray-900/30 border-gray-500/30 text-gray-500';
    }
  };
  
  return (
    <div className="group relative">
      {/* Hexagonal border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-flow"></div>
      
      <Card 
        glassEffect 
        className="relative h-full bg-gray-900/90 backdrop-blur-xl transform transition-all duration-500 group-hover:translate-y-[-4px] group-hover:scale-[1.02]"
      >
        <div className="flex flex-col h-full">
          {/* Agent header with hexagonal avatar frame */}
          <div className="flex items-center mb-6">
            <div className="relative flex-shrink-0 mr-4">
              <Hexagon size={48} className="text-blue-500/30 absolute inset-0 transform group-hover:rotate-90 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                {agent.avatar ? (
                  <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <Bot size={24} className="text-blue-400" />
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {agent.name}
              </h3>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getRiskBadgeColor(agent.riskLevel)}`}>
                  {agent.riskLevel === 'high' && <AlertTriangle size={12} className="mr-1" />}
                  {agent.riskLevel.charAt(0).toUpperCase() + agent.riskLevel.slice(1)} Risk
                </span>
                <span className="text-xs text-gray-500 ml-2">Created {timeAgo(agent.createdAt)}</span>
              </div>
            </div>
          </div>
          
          {/* Agent description with gradient border */}
          <div className="relative mb-6 p-4 rounded-lg bg-gray-800/50 border border-blue-500/10 group-hover:border-blue-500/30 transition-colors">
            <p className="text-gray-300 text-sm">
              {truncateText(agent.description, 120)}
            </p>
          </div>
          
          {/* Strategy highlight with animated background */}
          <div className="relative mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 animate-shimmer"></div>
            <div className="relative bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <BarChart3 size={18} className="text-blue-400 mr-3 mt-1" />
                <div>
                  <div className="text-xs text-gray-400 mb-1">Trading Strategy</div>
                  <div className="text-sm text-white">{agent.strategy}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action button */}
          <div className="mt-auto">
            <Button 
              variant="primary" 
              fullWidth 
              onClick={handleChatClick}
              rightIcon={<ChevronRight size={16} />}
              className="group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-shadow duration-500"
            >
              Chat with Agent
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgentCard;