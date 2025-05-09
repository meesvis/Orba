import React, { useRef, useEffect } from 'react';
import { getTokenDistribution } from '../../utils/helpers';

const TokenDistribution: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tokenDistribution = getTokenDistribution();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // For high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Reset canvas size in style
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    let startAngle = 0;
    
    // Draw the pie chart
    tokenDistribution.forEach(segment => {
      const endAngle = startAngle + (segment.percentage / 100) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      // Draw a line from center to edge
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      const lineAngle = startAngle + (endAngle - startAngle) / 2;
      ctx.lineTo(
        centerX + Math.cos(lineAngle) * radius,
        centerY + Math.sin(lineAngle) * radius
      );
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      startAngle = endAngle;
    });
    
    // Draw center circle for better aesthetics
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#111827';
    ctx.fill();
    ctx.strokeStyle = '#1F2937';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw text in center
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$AORA', centerX, centerY - 15);
    
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText('Token Distribution', centerX, centerY + 15);
    
  }, [tokenDistribution]);
  
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 border border-green-500/20 mb-4">
            <span className="text-sm text-green-400">Tokenomics</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            $AORA Token Distribution
          </h2>
          <p className="text-gray-400 text-lg">
            The $AORA token powers the entire ecosystem, providing governance rights, fee discounts, and access to premium features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white">Token Allocation</h3>
              
              <div className="space-y-4">
                {tokenDistribution.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{item.category}</span>
                        <span className="text-green-400 font-bold">{item.percentage}%</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-medium">Total Supply</h4>
                    <p className="text-gray-400 text-sm">Fixed, non-inflationary</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-bold text-2xl">100,000,000</span>
                    <p className="text-gray-400 text-sm">$AORA Tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <canvas 
                ref={canvasRef} 
                className="w-full max-w-md mx-auto" 
                style={{ height: '400px' }}
              ></canvas>
              
              {/* Add some decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenDistribution;