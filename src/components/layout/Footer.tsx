import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, FileText, Shield, Mail } from 'lucide-react';

interface FooterProps {
  isHomePage?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isHomePage = false }) => {
  if (isHomePage) {
    const normalStyling = "bg-gray-900 border-t border-gray-800 pt-10 pb-8 text-base";

    return (
      <footer 
        className={normalStyling}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to="/" className="text-xl font-bold text-white flex items-center">
                <img src="/logo.png" alt="Aora Logo" className="h-7 w-auto mr-2" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Aora</span>
              </Link>
              <p className="mt-3 text-gray-400 text-sm">
                AI-powered trading agents for Solana memecoins. The future of decentralized algorithmic trading.
              </p>
              <div className="mt-4 flex space-x-3">
                <SocialLink href="https://twitter.com/aora_ai" icon={<Twitter size={18} />} />
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Platform</h3>
              <ul className="space-y-2.5">
                <FooterLink to="/agents">Agents</FooterLink>
                <FooterLink to="/dashboard">Dashboard</FooterLink>
                <FooterLink to="/marketplace">Marketplace</FooterLink>
                <FooterLink to="/create-agent">Create Agent</FooterLink>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
              <ul className="space-y-2.5">
                <FooterLink to="/whitepaper">Whitepaper</FooterLink>
                <FooterLink to="/tokenomics">Tokenomics</FooterLink>
                <FooterLink to="/documentation">Documentation</FooterLink>
                <FooterLink to="/faq">FAQ</FooterLink>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
              <ul className="space-y-2.5">
                <FooterLink to="/terms">Terms of Service</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/disclaimer">Risk Disclaimer</FooterLink>
                <FooterLink to="/contact">Contact Us</FooterLink>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Aora AI. All rights reserved.
            </p>
            <div className="flex space-x-3 mt-3 md:mt-0">
              <Link to="/terms" className="text-gray-500 hover:text-gray-400 text-sm">Terms</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-400 text-sm">Privacy</Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-400 text-sm">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return null; // If not isHomePage, render nothing
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-gray-400 hover:text-green-400 transition-colors text-base"
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-green-400 transition-colors bg-gray-800 p-2 rounded-full hover:bg-gray-700"
    >
      {icon}
    </a>
  );
};

export default Footer;