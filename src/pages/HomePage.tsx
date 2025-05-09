import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import TokenDistribution from '../components/home/TokenDistribution';
import CTA from '../components/home/CTA';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <TokenDistribution />
      <CTA />
      <Footer isHomePage={true} />
    </div>
  );
};

export default HomePage;