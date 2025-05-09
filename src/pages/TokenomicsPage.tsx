import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TokenDistribution from '../components/home/TokenDistribution';

const TokenomicsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <div className="pt-20">
        <TokenDistribution />
        
        {/* Additional tokenomics information */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-white">$AORA Token Economics</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4 text-green-400">Token Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Token Name</div>
                      <div className="text-white font-medium">Aora</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Token Symbol</div>
                      <div className="text-white font-medium">$AORA</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Blockchain</div>
                      <div className="text-white font-medium">Solana</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Total Supply</div>
                      <div className="text-white font-medium">100,000,000 AORA</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Initial Circulating Supply</div>
                      <div className="text-white font-medium">15,000,000 AORA (15%)</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Token Type</div>
                      <div className="text-white font-medium">SPL Token</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4 text-green-400">Token Utility</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Platform Fee Discounts</h4>
                      <p className="text-gray-400 text-sm">
                        Staking $AORA tokens provides users with tiered discounts on trading fees, subscription costs, and other platform charges.
                      </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Agent Marketplace</h4>
                      <p className="text-gray-400 text-sm">
                        Users can buy, sell, and rent successful trading agent configurations using $AORA tokens, creating a marketplace for proven strategies.
                      </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Governance Rights</h4>
                      <p className="text-gray-400 text-sm">
                        $AORA holders can vote on platform development priorities, feature additions, supported tokens, and other governance decisions.
                      </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Premium Features</h4>
                      <p className="text-gray-400 text-sm">
                        Advanced trading strategies, additional agent customization options, and enhanced analytics are unlocked by staking threshold amounts.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4 text-green-400">Vesting Schedule</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">Allocation</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">Vesting Period</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">Cliff</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">TGE Unlock</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">Public Sale</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">None</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">None</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">100%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">Team</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">36 months</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">12 months</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">0%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">Advisors</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">24 months</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">6 months</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">0%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">Development</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">48 months</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">3 months</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">5%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">Marketing</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">30 months</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">None</td>
                          <td className="py-3 px-4 text-sm text-white border-b border-gray-700">10%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-white">Liquidity</td>
                          <td className="py-3 px-4 text-sm text-white">None</td>
                          <td className="py-3 px-4 text-sm text-white">None</td>
                          <td className="py-3 px-4 text-sm text-white">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TokenomicsPage;