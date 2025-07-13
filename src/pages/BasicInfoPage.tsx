import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

export const BasicInfoPage = () => {
  const { setCurrentPage, updateUserData } = useAppStore();
  const [normalDrinking, setNormalDrinking] = useState({
    beer: 4,
    soju: 1,
    wine: 2
  });

  const handleNext = () => {
    updateUserData({ normalDrinking });
    setCurrentPage('sleep');
  };

  const handleBack = () => {
    setCurrentPage('main');
  };

  const DrinkSlider = ({ 
    label, 
    value, 
    onChange, 
    max, 
    unit, 
    emoji 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    max: number;
    unit: string;
    emoji: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-700">
          {emoji} {label}
        </span>
        <span className="text-xl font-bold text-pink-500">
          {value}{unit}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max={max}
          step={unit === '병' ? 0.5 : 1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <PageContainer 
      title="평소 주량이 어떻게 돼?"
      showProgress
      currentStep={1}
      totalSteps={5}
      showBackButton
      onBackClick={handleBack}
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-600 mb-8"
        >
          솔직하게 말해줘! 기준점이 필요하거든 😊
        </motion.div>

        <div className="space-y-8">
          <DrinkSlider
            label="맥주 (캔)"
            value={normalDrinking.beer}
            onChange={(value) => setNormalDrinking(prev => ({ ...prev, beer: value }))}
            max={10}
            unit="캔"
            emoji="🍺"
          />

          <DrinkSlider
            label="소주"
            value={normalDrinking.soju}
            onChange={(value) => setNormalDrinking(prev => ({ ...prev, soju: value }))}
            max={3}
            unit="병"
            emoji="🍶"
          />

          <DrinkSlider
            label="와인 (잔)"
            value={normalDrinking.wine}
            onChange={(value) => setNormalDrinking(prev => ({ ...prev, wine: value }))}
            max={8}
            unit="잔"
            emoji="🍷"
          />
        </div>

        <div className="pt-8">
          <Button onClick={handleNext}>
            다음 단계로 ㄱㄱ
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};