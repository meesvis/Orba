import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowDown } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useAgents } from '../../context/AgentContext';
import { formatTime } from '../../utils/helpers';

interface ChatInterfaceProps {
  agentId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ agentId }) => {
  const { agents, messages, addMessage, isLoading, activeAgent } = useAgents();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const chatMessages = messages[agentId] || [];
  const agent = agents.find(a => a.id === agentId);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  // Check if scroll button should be shown
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages-container');
    
    if (chatContainer) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
        setShowScrollButton(isScrolledUp);
      };
      
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Auto-focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Trigger animation
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50); // Small delay to ensure initial styles are applied before transition
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    addMessage(agentId, input, 'user');
    setInput('');
    
    // Focus back on input after sending
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <Card 
      glassEffect 
      className={`
        flex flex-col 
        fixed inset-0 z-[100]
        transform-origin-top transition-all duration-700 ease-in-out
        ${isMounted ? 'opacity-100 rotate-x-0' : 'opacity-0 -rotate-x-90'}
      `}
      noPadding
    >
      {/* Chat header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900 rounded-t-xl flex items-center">
        <div className="flex-shrink-0 rounded-full overflow-hidden mr-3 border-2 border-green-500/30">
          {/* Always show Bot icon */}
          <div className="w-10 h-10 bg-gray-800 flex items-center justify-center">
            <Bot size={20} className="text-green-400" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-white">{agent?.name || 'Trading Agent'}</h3>
          <div className="flex items-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-gray-400 ml-2">Online</span>
          </div>
        </div>
      </div>
      
      {/* Messages container */}
      <div 
        id="chat-messages-container"
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        style={{ maxHeight: 'calc(100vh - 250px)' }}
      >
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Bot size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Start chatting with your trading agent</h3>
            <p className="text-gray-400 max-w-sm">
              Ask about market conditions, trading strategies, or specific tokens to get personalized insights.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0 self-end mb-1 mx-2">
                    {msg.sender === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
                        <User size={16} className="text-green-400" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <Bot size={16} className="text-green-400" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div 
                      className={`rounded-xl p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-green-900/30 text-white rounded-tr-none' 
                          : 'bg-gray-800 text-white rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div 
                      className={`text-xs text-gray-500 mt-1 ${
                        msg.sender === 'user' ? 'text-right mr-2' : 'ml-2'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] flex-row">
                  <div className="flex-shrink-0 self-end mb-1 mx-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <Bot size={16} className="text-green-400" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="rounded-xl p-3 bg-gray-800 text-white rounded-tl-none">
                      <div className="flex items-center">
                        <div className="dot-typing"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-4 bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowDown size={20} className="text-green-400" />
        </button>
      )}
      
      {/* Input form */}
      <div className="p-4 border-t border-gray-800 bg-gray-900 rounded-b-xl">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trading opportunities..."
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            variant={input.trim() ? 'primary' : 'secondary'}
            className="rounded-l-none"
            disabled={!input.trim() || isLoading}
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;