import React, { useState, useEffect } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled 
      ? 'bg-gray-900/80 backdrop-blur-xl border-b border-blue-500/10 py-4'
      : 'bg-transparent py-8'
  }`;
  
  return (
    <nav className={navbarClasses}>
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-extrabold text-white flex items-center group">
          <div className="mr-3 relative">
            <Hexagon size={40} className="text-blue-500 transform transition-transform group-hover:rotate-180 duration-700" />
            <Hexagon size={40} className="text-indigo-500 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transform group-hover:rotate-90 transition-all duration-700" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Orba
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/agents">Agents</NavLink>
          <NavLink to="/whitepaper">Whitepaper</NavLink>
          <NavLink to="/tokenomics">Tokenomics</NavLink>
          <a 
            href="https://twitter.com/orba_ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </span>
          </a>
          <Link to="/agents">
            <Button 
              size="lg" 
              className="px-6 py-2.5 transform hover:translate-y-[-2px] transition-all duration-300"
            >
              Launch App
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`
          md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 space-y-6">
          <MobileNavLink to="/agents" onClick={() => setIsOpen(false)}>Agents</MobileNavLink>
          <MobileNavLink to="/whitepaper" onClick={() => setIsOpen(false)}>Whitepaper</MobileNavLink>
          <MobileNavLink to="/tokenomics" onClick={() => setIsOpen(false)}>Tokenomics</MobileNavLink>
          <a 
            href="https://twitter.com/orba_ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block px-3 py-2 text-xl font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
          >
            Follow on X
          </a>
          <div className="pt-6">
            <Link to="/agents" onClick={() => setIsOpen(false)}>
              <Button fullWidth size="lg" className="py-3 text-lg">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative text-gray-300 hover:text-white transition-colors group text-lg"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      className="block px-3 py-2 text-xl font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;