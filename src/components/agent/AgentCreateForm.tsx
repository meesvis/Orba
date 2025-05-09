import React, { useState } from 'react';
import { Bot, Loader, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Card from '../ui/Card';
import { useAgents } from '../../context/AgentContext';
import { useNavigate } from 'react-router-dom';
import { getRandomAvatar } from '../../utils/helpers';

const AgentCreateForm: React.FC = () => {
  const { createAgent } = useAgents();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [strategy, setStrategy] = useState('');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    strategy?: string;
  }>({});
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      description?: string;
      strategy?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Agent name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!strategy.trim()) {
      newErrors.strategy = 'Trading strategy is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newAgent = createAgent({
        name,
        description,
        strategy,
        riskLevel,
        avatar: getRandomAvatar(),
      });
      
      setIsSubmitting(false);
      navigate(`/chat/${newAgent.id}`);
    }, 1500);
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <Card glassEffect>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 border border-green-500/30 mb-4">
            <Bot size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Create Your Trading Agent</h2>
          <p className="text-gray-400">
            Configure your AI trading agent's personality, strategy, and risk parameters.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Agent Name"
            placeholder="e.g., MoonShot Trader"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            fullWidth
          />
          
          <Textarea
            label="Description"
            placeholder="Describe your agent's personality and trading approach..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            fullWidth
          />
          
          <Textarea
            label="Trading Strategy"
            placeholder="Describe the trading strategy you want your agent to follow..."
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            error={errors.strategy}
            fullWidth
          />
          
          <Select
            label="Risk Level"
            options={[
              { value: 'low', label: 'Low Risk (Conservative)' },
              { value: 'medium', label: 'Medium Risk (Balanced)' },
              { value: 'high', label: 'High Risk (Aggressive)' },
            ]}
            value={riskLevel}
            onChange={(value) => setRiskLevel(value as 'low' | 'medium' | 'high')}
            fullWidth
          />
          
          {/* Risk level indicator */}
          <div className="mb-6">
            <div className="flex items-center mt-2">
              {riskLevel === 'low' && (
                <div className="flex items-center text-green-500 text-sm">
                  <CheckCircle2 size={16} className="mr-1" />
                  Conservative approach with focus on capital preservation
                </div>
              )}
              
              {riskLevel === 'medium' && (
                <div className="flex items-center text-yellow-500 text-sm">
                  <CheckCircle2 size={16} className="mr-1" />
                  Balanced approach with moderate risk for better returns
                </div>
              )}
              
              {riskLevel === 'high' && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertTriangle size={16} className="mr-1" />
                  Aggressive approach seeking maximum returns with high volatility
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              type="submit" 
              size="lg" 
              isLoading={isSubmitting}
              leftIcon={!isSubmitting ? <Bot size={18} /> : undefined}
            >
              Create AI Trading Agent
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AgentCreateForm;