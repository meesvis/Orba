import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverEffect?: boolean;
  bordered?: boolean;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glassEffect = false,
  hoverEffect = false,
  bordered = false,
  noPadding = false,
}) => {
  const baseClasses = 'rounded-xl shadow-xl transition-all duration-300';
  
  const paddingClass = noPadding ? '' : 'p-6';
  
  const glassClasses = glassEffect 
    ? 'bg-gray-900/70 backdrop-blur-md border border-gray-800' 
    : 'bg-gray-900';
  
  const hoverClasses = hoverEffect 
    ? 'hover:shadow-2xl hover:shadow-green-500/10 hover:scale-105 hover:border-green-500/30'
    : '';
  
  const borderClasses = bordered 
    ? 'border border-gray-700'
    : '';
  
  return (
    <div className={`${baseClasses} ${glassClasses} ${paddingClass} ${hoverClasses} ${borderClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;