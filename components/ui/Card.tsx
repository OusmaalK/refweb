import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 transition-all duration-300 ${hover ? 'hover:shadow-2xl transform hover:-translate-y-2' : ''} ${className}`}>
      {children}
    </div>
  );
};
