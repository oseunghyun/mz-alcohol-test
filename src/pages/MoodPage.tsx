import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

type MoodType = 'stressed' | 'tired' | 'good';

export const MoodPage = () => {
  const { setCurrentPage, updateUserData, userData, calculateResult } = useAppStore();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const handleNext = () => {
    if (!selectedMood) return;
    
    updateUserData({
      todayCondition: {
        ...userData.todayCondition,
        mood: selectedMood
      }
    });
    
    // 결과 계산하고 결과 페이지로 이동
    setTimeout(() => {
      calculateResult();
      setCurrentPage('result');
    }, 100);
  };

  const moodOptions = [
    {
      type: 'stressed' as MoodType,
      emoji: '😤',
      title: '폭발 직전',
      description: '스트레스가 MAX야',
      color: 'from-red-400 to-red-600'
    },
    {
      type: 'tired' as MoodType,
      emoji: '😮‍💨',
      title: '배터리 10%',
      description: '오늘 너무 피곤해',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      type: 'good' as MoodType,
      emoji: '😎',
      title: '레츠고 모드',
      description: '오늘 기분이 좋아!',
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <PageContainer 
      title="오늘 기분 어때?"
      showProgress
      currentStep={4}
      totalSteps={5}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-600 mb-8"
        >
          기분도 주량에 영향을 줘! 솔직하게 말해봐 😊
        </motion.div>

        <div className="space-y-4">
          {moodOptions.map((option, index) => (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMood(option.type)}
              className={`
                relative p-6 rounded-2xl cursor-pointer transition-all duration-200
                ${selectedMood === option.type 
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
                  <div className={`text-sm ${selectedMood === option.type ? 'text-white/80' : 'text-gray-500'}`}>
                    {option.description}
                  </div>
                </div>
                {selectedMood === option.type && (
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
            disabled={!selectedMood}
          >
            결과 보러 ㄱㄱ! 🎯
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};