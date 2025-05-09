import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhitepaperContent from '../components/whitepaper/WhitepaperContent';

const WhitepaperPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <WhitepaperContent />
      <Footer />
    </div>
  );
};

export default WhitepaperPage;