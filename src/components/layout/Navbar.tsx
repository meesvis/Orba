import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
  
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg shadow-black/20 py-6'
      : 'bg-transparent py-10'
  }`;
  
  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-white flex items-center">
          <img src="/logo.png" alt="Aora Logo" className="h-14 w-auto mr-4" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Aora</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <NavLink to="/agents"><span className="text-lg">Agents</span></NavLink>
          <NavLink to="/whitepaper"><span className="text-lg">Whitepaper</span></NavLink>
          <NavLink to="/tokenomics"><span className="text-lg">Tokenomics</span></NavLink>
          <a 
            href="https://twitter.com/aora_ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors text-lg"
          >
            <span className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              Follow
            </span>
          </a>
          <Link to="/agents">
            <Button size="lg" className="px-8 py-3 text-lg">Launch App</Button>
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
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <MobileNavLink to="/agents" onClick={() => setIsOpen(false)}><span className="text-lg">Agents</span></MobileNavLink>
            <MobileNavLink to="/whitepaper" onClick={() => setIsOpen(false)}><span className="text-lg">Whitepaper</span></MobileNavLink>
            <MobileNavLink to="/tokenomics" onClick={() => setIsOpen(false)}><span className="text-lg">Tokenomics</span></MobileNavLink>
            <a 
              href="https://twitter.com/aora_ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md text-lg"
            >
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                Follow on X
              </span>
            </a>
            <div className="px-3 py-2">
              <Link to="/agents">
                <Button fullWidth size="lg" className="py-3 text-lg">Launch App</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
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
      className="text-gray-300 hover:text-white transition-colors hover:underline decoration-green-400 decoration-2 underline-offset-4"
    >
      {children}
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
      className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;