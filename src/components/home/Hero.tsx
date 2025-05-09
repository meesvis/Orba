import React, { useState, useEffect } from 'react';
import { Terminal, Zap, ArrowRight, Clipboard, Check } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btcozgnswtiozjerqihc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Y296Z25zd3Rpb3pqZXJxaWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MDM4MDQsImV4cCI6MjA1NzQ3OTgwNH0.2TLAMnBjzS9c8hcZQ5GqBfDvpj-0Zs12WvIOAGB_7JA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Hero: React.FC = () => {
  const [word, setWord] = useState<string>('Launching Q3 2025'); // Default word
  const [copied, setCopied] = useState(false); // State for copy feedback

  useEffect(() => {
    const fetchWord = async () => {
      const { data, error } = await supabase
        .from('words') // Assuming your table is named 'words'
        .select('word')
        .order('id', { ascending: false }) // Get the latest word based on id
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching word. Supabase error:', JSON.stringify(error, null, 2));
      } else if (data) {
        setWord(data.word);
      }
    };

    fetchWord();

    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'words' }, // Assuming your table is named 'words'
        (payload) => {
          console.log('Supabase Realtime event received for table words:', payload);
          if (payload.new && 'word' in payload.new) {
            console.log('Updating word from payload:', (payload.new as { word: string }).word);
            setWord((payload.new as { word: string }).word);
          } else {
            console.log('Payload did not contain new word data or payload.new is null. Current payload:', payload);
          }
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to Supabase Realtime for table: words');
        } else {
          console.error('Supabase Realtime subscription failed. Status:', status, 'Error:', err);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCopy = () => {
    console.log('handleCopy called. Current word:', word);
    if (!navigator.clipboard) {
      console.error('Clipboard API not available.');
      alert('Clipboard API not available in your browser or context.');
      return;
    }
    console.log('Clipboard API is available.');

    navigator.clipboard.writeText(word).then(() => {
      console.log('Word copied to clipboard successfully:', word);
      setCopied(true);
      console.log('setCopied(true) called');
      setTimeout(() => {
        setCopied(false);
        console.log('setCopied(false) called after timeout');
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy word: ', err);
      alert('Failed to copy. See console for details.');
    });
  };

  return (
    <div className="relative overflow-hidden bg-gray-950 pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDE0MTQiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bS00IDEyaC00di00aDR2NHptMC02aC00di00aDR2NHptMC02aC00VjZoNHY0em0tNiAxMmgtNHYtNGg0djR6bTAtNmgtNHYtNGg0djR6bTAtNmgtNFY2aDR2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-gray-950 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      
      {/* Adjusted z-index to be lower than Navbar */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm text-gray-300 mr-2">{word}</span>
            <button 
              onClick={() => { 
                console.log('Copy button JSX onClick triggered'); 
                handleCopy(); 
              }}
              className="p-1 rounded text-gray-400 hover:text-green-400 transition-colors focus:outline-none"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Clipboard size={16} />}
            </button>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            AI-Powered Trading Agents<br />for Solana Memecoins
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Create personalized AI trading agents that leverage advanced algorithms to identify and capitalize on Solana memecoin opportunities while you sleep.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/create-agent">
              <Button 
                size="lg" 
                leftIcon={<Terminal size={18} />}
                className="min-w-56 px-6" /* Further increased min-width */
              >
                Create Agent
              </Button>
            </Link>
            
            <Link to="/whitepaper">
              <Button 
                variant="outline" 
                size="lg" 
                rightIcon={<ArrowRight size={18} />}
                className="min-w-56 px-6" /* Further increased min-width */
              >
                Read Whitepaper
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Trading terminal mockup */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-2xl shadow-green-900/20">
            <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-gray-800">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-400 text-sm">aora-trading-terminal</span>
              </div>
            </div>
            
            <div className="bg-gray-950 p-6 font-mono text-sm relative overflow-hidden">
              <div className="text-green-400">$ Initializing Aora Trading Agent (v0.1.3-alpha)...</div>
              <div className="text-gray-500 mt-2">_</div>
              <div className="text-gray-400 mt-2">{">"} Connecting to Solana network...</div>
              <div className="text-gray-400 mt-1">{">"} Cluster: mainnet-beta</div>
              <div className="text-gray-400 mt-1">{">"} Memecoin analysis module loaded</div>
              <div className="text-gray-400 mt-1">{">"} AI prediction engine initialized</div>
              <div className="text-green-400 mt-2">{">"} TRADING_BOT_ONLINE</div>
              <div className="flex items-center text-green-400 mt-2">
                <Zap size={16} className="mr-2" />
                <span>Scanning for opportunities...</span>
              </div>
              
              <div className="mt-4 text-white">$ BONK/USDC - Potential breakout detected</div>
              <div className="text-gray-400 mt-1">{">"} Signal strength: 87%</div>
              <div className="text-gray-400 mt-1">{">"} 24h Volume: +127%</div>
              <div className="text-gray-400 mt-1">{">"} Technical indicators: Bullish divergence</div>
              <div className="text-amber-400 mt-2">{">"} Entry zone: 0.00000831 - 0.00000850</div>
              <div className="text-amber-400 mt-1">{">"} Stop loss: 0.00000795</div>
              <div className="text-amber-400 mt-1">{">"} Take profit: 0.00000920</div>
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Terminal cursor */}
              <div className="absolute bottom-6 left-6 w-3 h-5 bg-green-500 opacity-75 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;