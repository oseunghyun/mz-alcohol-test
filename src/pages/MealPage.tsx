import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

type MealType = 'empty' | 'light' | 'heavy';

export const MealPage = () => {
  const { setCurrentPage, updateUserData, userData } = useAppStore();
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);

  const handleNext = () => {
    if (!selectedMeal) return;
    
    updateUserData({
      todayCondition: {
        ...userData.todayCondition,
        meal: selectedMeal
      }
    });
    setCurrentPage('mood');
  };

  const handleBack = () => {
    setCurrentPage('sleep');
  };

  const mealOptions = [
    {
      type: 'empty' as MealType,
      emoji: '🤮',
      title: '공복 챌린저',
      description: '아무것도 안 먹었어',
      color: 'from-red-400 to-red-600'
    },
    {
      type: 'light' as MealType,
      emoji: '🍗',
      title: '치킨 대기 모드',
      description: '간단하게 먹었어',
      color: 'from-orange-400 to-orange-600'
    },
    {
      type: 'heavy' as MealType,
      emoji: '🍖',
      title: '고기 파워 모드',
      description: '든든하게 먹었어',
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <PageContainer 
      title="오늘 뭐 먹었어?"
      showProgress
      currentStep={3}
      totalSteps={5}
      showBackButton
      onBackClick={handleBack}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-600 mb-8"
        >
          음식은 술의 흡수 속도를 좌우해! 🍽️
        </motion.div>

        <div className="space-y-4">
          {mealOptions.map((option, index) => (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMeal(option.type)}
              className={`
                relative p-6 rounded-2xl cursor-pointer transition-all duration-200
                ${selectedMeal === option.type 
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105` 
                  : 'bg-gray-50 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">
                  {option.emoji}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold">
                    {option.title}
                  </div>
                  <div className={`text-sm ${selectedMeal === option.type ? 'text-white/80' : 'text-gray-500'}`}>
                    {option.description}
                  </div>
                </div>
                {selectedMeal === option.type && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                  >
                    ✅
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-6">
          <Button 
            onClick={handleNext}
            disabled={!selectedMeal}
          >
            다음 단계로 ㄱㄱ
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};