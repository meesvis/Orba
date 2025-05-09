import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AgentCard from '../components/agent/AgentCard';
import { useAgents } from '../context/AgentContext';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentsPage: React.FC = () => {
  const { agents } = useAgents();
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Trading Agents</h1>
            <p className="text-gray-400">Manage and chat with your AI-powered trading assistants</p>
          </div>
        </div>
        
        {agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            <Card glassEffect hoverEffect className="flex flex-col items-center justify-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 border border-green-500/30 mb-4">
                <Plus size={32} className="text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Create New Agent</h2>
              <p className="text-gray-400 mb-6 text-center">Add another AI trading agent to your team.</p>
              <Link to="/create-agent">
                <Button size="lg" leftIcon={<Plus size={18} />}>Create Agent</Button>
              </Link>
            </Card>
          </div>
        ) : (
          <Card glassEffect className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-6">
                <Plus size={24} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">No Agents Yet</h2>
              <p className="text-gray-400 mb-8">
                Create your first AI trading agent to start monitoring and trading Solana memecoins.
              </p>
              <Link to="/create-agent">
                <Button size="lg">Create Your First Agent</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AgentsPage;