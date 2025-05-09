import React from 'react';
import { Bot, BarChart3, Shield, Sparkles, Zap, Lock, LineChart, Coins } from 'lucide-react';
import Card from '../ui/Card';

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 border border-green-500/20 mb-4">
            <span className="text-sm text-green-400">Powered by AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            The Future of Memecoin Trading
          </h2>
          <p className="text-gray-400 text-lg">
            Aora's AI trading agents combine advanced algorithms, real-time data analysis, and 
            customizable strategies to navigate the volatile world of Solana memecoins.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bot className="text-green-400" size={28} />}
            title="Personalized AI Agents"
            description="Create custom trading agents with specific strategies, risk tolerances, and objectives tailored to your preferences."
          />
          
          <FeatureCard
            icon={<BarChart3 className="text-green-400" size={28} />}
            title="Real-time Analysis"
            description="Agents continuously monitor market trends, on-chain activity, and social sentiment to identify potential opportunities."
          />
          
          <FeatureCard
            icon={<Shield className="text-green-400" size={28} />}
            title="Risk Management"
            description="Set custom risk parameters including position sizing, stop-losses, and profit targets to protect your capital."
          />
          
          <FeatureCard
            icon={<Sparkles className="text-green-400" size={28} />}
            title="Pattern Recognition"
            description="AI algorithms identify high-potential setups and market patterns across hundreds of memecoin pairs simultaneously."
          />
          
          <FeatureCard
            icon={<Zap className="text-green-400" size={28} />}
            title="Fast Execution"
            description="Take advantage of fleeting opportunities with high-speed, low-latency trading infrastructure."
          />
          
          <FeatureCard
            icon={<Lock className="text-green-400" size={28} />}
            title="Non-Custodial Security"
            description="Your funds remain in your control at all times. Agents execute trades through secure permission-based protocols."
          />
          
          <FeatureCard
            icon={<LineChart className="text-green-400" size={28} />}
            title="Performance Tracking"
            description="Monitor your agent's performance with detailed analytics, trade history, and optimization suggestions."
          />
          
          <FeatureCard
            icon={<Coins className="text-green-400" size={28} />}
            title="Multi-DEX Support"
            description="Trade across multiple Solana DEXs including Jupiter, Raydium, and Orca for optimal execution."
          />
          
          {/* Bonus feature card that spans two columns on larger screens */}
          <div className="md:col-span-2 lg:col-span-1">
            <Card 
              glassEffect 
              hoverEffect
              className="h-full p-8 border border-green-500/30"
            >
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-900/30 mb-4">
                    <span className="text-green-400 font-bold text-lg">$AORA</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Token Utility</h3>
                  <p className="text-gray-400">
                    Stake $AORA tokens to unlock premium features, reduce fees, and participate in platform governance.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card 
      glassEffect 
      hoverEffect
      className="h-full p-8"
    >
      <div className="flex justify-center md:justify-start">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 mb-4">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-white text-center md:text-left">{title}</h3>
      <p className="text-gray-400 text-center md:text-left">{description}</p>
    </Card>
  );
};

export default Features;