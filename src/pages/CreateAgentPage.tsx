import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AgentCreateForm from '../components/agent/AgentCreateForm';

const CreateAgentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create a Trading Agent</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Configure your personalized AI trading agent to monitor and trade Solana memecoins according to your strategy.
          </p>
        </div>
        
        <AgentCreateForm />
      </div>
      
      {/* Footer removed from this page */}
    </div>
  );
};

export default CreateAgentPage;