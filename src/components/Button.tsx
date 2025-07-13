import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = ''
}: ButtonProps) => {
  const baseClasses = 'w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg',
    secondary: 'bg-gray-100 text-gray-700 border-2 border-gray-200'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};