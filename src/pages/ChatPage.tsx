import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ChatInterface from '../components/agent/ChatInterface';
import { useAgents } from '../context/AgentContext';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const ChatPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const { agents, setActiveAgent } = useAgents();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set the active agent based on the URL param
    if (agentId) {
      setActiveAgent(agentId);
    }
    
    // Clear active agent when leaving page
    return () => {
      setActiveAgent(null);
    };
  }, [agentId, setActiveAgent]);
  
  // Check if agent exists
  const agent = agents.find(a => a.id === agentId);
  
  if (!agentId || !agent) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Agent Not Found</h2>
            <p className="text-gray-400 mb-8">The requested trading agent does not exist or has been deleted.</p>
            <Button onClick={() => navigate('/agents')}>Back to Agents</Button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/agents')}
            leftIcon={<ArrowLeft size={18} />}
          >
            Back to Agents
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Agent info sidebar on desktop */}
          <div className="hidden lg:block w-80 bg-gray-900 rounded-xl shadow-xl p-6 h-fit">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 rounded-full overflow-hidden mr-3 border-2 border-green-500/30">
                {agent.avatar ? (
                  <img src={agent.avatar} alt={agent.name} className="w-12 h-12 object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-gray-800"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.riskLevel} risk profile</p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-4 mt-4">
              <h4 className="text-sm font-medium text-green-400 mb-2">Description</h4>
              <p className="text-sm text-gray-300 mb-4">{agent.description}</p>
              
              <h4 className="text-sm font-medium text-green-400 mb-2">Strategy</h4>
              <p className="text-sm text-gray-300">{agent.strategy}</p>
            </div>
            
            <div className="border-t border-gray-800 pt-4 mt-4">
              <h4 className="text-sm font-medium text-green-400 mb-2">Trading Capabilities</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Market analysis</span>
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Token screening</span>
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Trade execution</span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">Coming soon</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Portfolio tracking</span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">Coming soon</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat interface */}
          <div className="flex-1">
            <ChatInterface agentId={agentId} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatPage;