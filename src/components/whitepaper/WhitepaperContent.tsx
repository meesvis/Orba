import React from 'react';
import Card from '../ui/Card';

const WhitepaperContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card glassEffect className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Aora Whitepaper</h1>
            <p className="text-lg text-gray-400">
              Revolutionizing Memecoin Trading Through AI-Powered Agents
            </p>
            <div className="mt-4 text-gray-500">v1.0 | June 2025</div>
          </div>
          
          <div className="prose prose-invert max-w-none prose-headings:text-green-400 prose-a:text-green-400">
            <h2>1. Abstract</h2>
            <p>
              Aora introduces a paradigm shift in cryptocurrency trading by leveraging artificial intelligence 
              to create personalized trading agents specifically optimized for the volatile memecoin market on Solana. 
              These agents utilize advanced machine learning algorithms, on-chain data analysis, and technical indicators 
              to identify and capitalize on trading opportunities with greater precision and speed than human traders.
            </p>
            
            <h2>2. Introduction</h2>
            <p>
              The Solana memecoin ecosystem has experienced explosive growth, characterized by extreme volatility, 
              rapid price movements, and unprecedented opportunities. However, navigating this landscape effectively 
              requires constant vigilance, technical expertise, and emotional discipline—attributes that are challenging 
              for many traders to maintain consistently.
            </p>
            <p>
              Aora addresses these challenges by offering personalized AI trading agents that operate according to 
              user-defined parameters, strategies, and risk tolerances. These agents continuously monitor the market, 
              identify patterns, and execute trades with precision, eliminating human emotions and biases from the 
              trading process.
            </p>
            
            <h2>3. System Architecture</h2>
            <p>
              The Aora platform comprises several integrated components:
            </p>
            <ul>
              <li>
                <strong>AI Core:</strong> Our proprietary machine learning system trained on historical memecoin trading data
              </li>
              <li>
                <strong>On-Chain Analytics:</strong> Real-time monitoring of blockchain transactions, wallet activities, and liquidity changes
              </li>
              <li>
                <strong>Market Data Aggregator:</strong> Price, volume, and orderbook data from multiple DEXs
              </li>
              <li>
                <strong>Social Sentiment Analyzer:</strong> Monitoring of social media, forums, and news for sentiment shifts
              </li>
              <li>
                <strong>Execution Engine:</strong> High-speed, low-latency trade execution across multiple liquidity sources
              </li>
              <li>
                <strong>Risk Management Module:</strong> Sophisticated position sizing and risk control algorithms
              </li>
            </ul>
            
            <h2>4. Agent Creation and Customization</h2>
            <p>
              Users can create personalized trading agents by:
            </p>
            <ul>
              <li>Selecting from pre-defined strategy templates (momentum, breakout, mean-reversion, etc.)</li>
              <li>Customizing risk parameters (position size, max drawdown, risk-reward ratios)</li>
              <li>Defining token focus (specific memecoins or categories)</li>
              <li>Setting time horizons (scalping, day trading, swing trading)</li>
              <li>Establishing performance goals</li>
            </ul>
            <p>
              Once configured, agents operate autonomously while providing real-time updates and performance metrics to users.
            </p>
            
            <h2>5. $AORA Token Utility</h2>
            <p>
              The $AORA token serves as the core utility and governance token for the ecosystem:
            </p>
            <ul>
              <li>
                <strong>Fee Reduction:</strong> Token holders receive discounted platform fees
              </li>
              <li>
                <strong>Premium Features:</strong> Advanced strategies and tools unlock with token staking
              </li>
              <li>
                <strong>Governance:</strong> Voting rights on protocol upgrades and feature development
              </li>
              <li>
                <strong>Revenue Sharing:</strong> Staked tokens earn a share of platform revenue
              </li>
              <li>
                <strong>Agent Marketplace:</strong> Creation and trading of successful agent strategies
              </li>
            </ul>
            
            <h2>6. Security Measures</h2>
            <p>
              Aora implements robust security measures:
            </p>
            <ul>
              <li>Non-custodial design ensuring users maintain control of their funds</li>
              <li>Permission-based execution limiting agent actions to authorized operations</li>
              <li>Encryption of all sensitive data and communications</li>
              <li>Regular security audits by leading blockchain security firms</li>
              <li>Bug bounty program to incentivize vulnerability disclosure</li>
            </ul>
            
            <h2>7. Roadmap</h2>
            <p>
              Our development roadmap encompasses:
            </p>
            <ul>
              <li>
                <strong>Q3 2025:</strong> Public beta launch with basic agent capabilities
              </li>
              <li>
                <strong>Q4 2025:</strong> Advanced technical analysis patterns and social sentiment integration
              </li>
              <li>
                <strong>Q1 2026:</strong> Agent marketplace and strategy sharing functionality
              </li>
              <li>
                <strong>Q2 2026:</strong> Cross-chain expansion to additional networks
              </li>
              <li>
                <strong>Q3 2026:</strong> Mobile application with push notifications
              </li>
              <li>
                <strong>Q4 2026:</strong> Institutional-grade API and white-label solutions
              </li>
            </ul>
            
            <h2>8. Conclusion</h2>
            <p>
              Aora represents a significant advancement in cryptocurrency trading technology, democratizing access to 
              sophisticated trading algorithms previously available only to institutional investors. By combining artificial 
              intelligence, real-time data analysis, and customizable trading strategies, Aora empowers traders of all 
              experience levels to navigate the complex memecoin landscape more effectively and profitably.
            </p>
            <p>
              The future of trading is intelligent, personalized, and autonomous—and Aora is leading this transformation 
              in the Solana memecoin ecosystem.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WhitepaperContent;