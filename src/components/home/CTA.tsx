import React from 'react';
import { ArrowRight, Bot } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Border gradient effect */}
          <div className="absolute inset-0 rounded-2xl border border-green-500/20"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Experience the Future<br />of Memecoin Trading?
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Create your first AI trading agent in minutes, customize its strategy, and watch it work for you. No coding required.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/create-agent">
                  <Button 
                    size="lg" 
                    leftIcon={<Bot size={18} />}
                    className="min-w-40"
                  >
                    Create Your Agent
                  </Button>
                </Link>
                
                <Link to="/whitepaper">
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    rightIcon={<ArrowRight size={18} />}
                    className="min-w-40"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-700">
              <StatItem 
                value="1,200+" 
                label="Trading Agents Created" 
              />
              
              <StatItem 
                value="$2.4M+" 
                label="Trading Volume" 
              />
              
              <StatItem 
                value="24/7" 
                label="Market Monitoring" 
              />
              
              <StatItem 
                value="127+" 
                label="Supported Tokens" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
};

export default CTA;