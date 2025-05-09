import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AgentProvider } from './context/AgentContext';

// Pages
import HomePage from './pages/HomePage';
import AgentsPage from './pages/AgentsPage';
import CreateAgentPage from './pages/CreateAgentPage';
import ChatPage from './pages/ChatPage';
import WhitepaperPage from './pages/WhitepaperPage';
import TokenomicsPage from './pages/TokenomicsPage';

// CSS for typing animation
import './styles/animations.css';

function App() {
  return (
    <AgentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/create-agent" element={<CreateAgentPage />} />
          <Route path="/chat/:agentId" element={<ChatPage />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/tokenomics" element={<TokenomicsPage />} />
        </Routes>
      </Router>
    </AgentProvider>
  );
}

export default App;