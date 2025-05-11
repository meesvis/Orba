import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import TokenDistribution from '../components/home/TokenDistribution';
import CTA from '../components/home/CTA';

const HomePage: React.FC = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show footer if scrolled more than 200px
      const isScrolledEnough = window.scrollY > 200;
      
      if (isScrolledEnough) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <TokenDistribution />
      <CTA />
      <Footer isVisible={isFooterVisible} isHomePage={true} />
    </div>
  );
};

export default HomePage;