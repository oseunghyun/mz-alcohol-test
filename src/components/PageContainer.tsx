import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const PageContainer = ({ 
  children, 
  title, 
  showProgress = false,
  currentStep = 1,
  totalSteps = 5,
  showBackButton = false,
  onBackClick
}: PageContainerProps) => {
  return (
    <div className="mobile-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 min-h-screen flex flex-col"
      >
        {showBackButton && onBackClick && (
          <div className="mb-4">
            <button 
              onClick={onBackClick}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {showProgress && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{currentStep}/{totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {title && (
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
            {title}
          </h1>
        )}
        
        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
};