import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

export const SleepPage = () => {
  const { setCurrentPage, updateUserData, userData } = useAppStore();
  const [sleepHours, setSleepHours] = useState(7);

  const handleNext = () => {
    updateUserData({
      todayCondition: {
        ...userData.todayCondition,
        sleep: sleepHours
      }
    });
    setCurrentPage('meal');
  };

  const getSleepStatus = (hours: number) => {
    if (hours <= 3) return { emoji: '😵‍💫', text: '좀비 모드', color: 'text-red-500' };
    if (hours <= 6) return { emoji: '😴', text: '부족 모드', color: 'text-orange-500' };
    if (hours <= 8) return { emoji: '😊', text: '굿 모드', color: 'text-green-500' };
    return { emoji: '🥱', text: '겨울잠 모드', color: 'text-blue-500' };
  };

  const sleepStatus = getSleepStatus(sleepHours);

  return (
    <PageContainer 
      title="어제 몇 시간 잤어?"
      showProgress
      currentStep={2}
      totalSteps={5}
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <motion.div
            key={sleepHours}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-8xl"
          >
            {sleepStatus.emoji}
          </motion.div>
          
          <div className={`text-2xl font-bold ${sleepStatus.color}`}>
            {sleepStatus.text}
          </div>
          
          <div className="text-6xl font-bold text-gray-800">
            {sleepHours}시간
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1시간</span>
              <span>6시간</span>
              <span>8시간</span>
              <span>12시간</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 rounded-2xl p-4 text-center text-sm text-gray-600"
        >
          수면 시간은 음주량에 큰 영향을 미쳐요! 😴
        </motion.div>

        <div className="pt-4">
          <Button onClick={handleNext}>
            다음 단계로 ㄱㄱ
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};