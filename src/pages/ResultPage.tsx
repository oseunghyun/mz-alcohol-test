// import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Clock, Home } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
// import { AdBanner } from '../components/AdBanner';
// import { PremiumModal } from '../components/PremiumModal';
import { useAppStore } from '../store/useAppStore';

export const ResultPage = () => {
  const { result, setCurrentPage, resetData } = useAppStore();
  // const [showPremiumModal, setShowPremiumModal] = useState(false);

  if (!result) return null;

  const getLevelInfo = (level: string) => {
    const levels = {
      SSS: {
        emoji: '👑',
        text: '오늘 주신이 강림했다',
        color: 'from-yellow-400 to-orange-500',
      },
      S: {
        emoji: '🔥',
        text: '오늘 개잘마셔',
        color: 'from-red-400 to-pink-500',
      },
      A: {
        emoji: '👍',
        text: '그럭저럭 ㄱㄴ',
        color: 'from-green-400 to-blue-500',
      },
      B: {
        emoji: '🤔',
        text: '적당히 해',
        color: 'from-blue-400 to-purple-500',
      },
      C: {
        emoji: '🏠',
        text: '집에서 캔맥이나',
        color: 'from-gray-400 to-gray-600',
      },
      D: { emoji: '💧', text: '오늘은 물', color: 'from-blue-200 to-blue-400' },
    };
    return levels[level as keyof typeof levels];
  };

  const levelInfo = getLevelInfo(result.level);

  const handleShare = () => {
    setCurrentPage('share');
  };

  const handleRestart = () => {
    resetData();
  };

  // const handlePremiumUpgrade = () => {
  //   alert('결제 페이지로 이동합니다! 💳');
  //   setShowPremiumModal(false);
  // };

  return (
    <>
      <PageContainer showProgress currentStep={5} totalSteps={5}>
        {/* <AdBanner position="top" /> */}

        <div className='space-y-6'>
          {/* 등급 표시 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className={`bg-gradient-to-r ${levelInfo.color} rounded-3xl p-8 text-white text-center`}
          >
            <div className='text-6xl mb-4'>{levelInfo.emoji}</div>
            <div className='text-2xl font-bold mb-2'>오늘의 주량 판정</div>
            <div className='text-4xl font-black mb-4'>{result.level}급</div>
            <div className='text-lg'>{levelInfo.text}</div>
            <div className='text-3xl font-bold mt-4'>
              평소의 {result.percentage}% 파워!
            </div>
          </motion.div>

          {/* 추천 주종 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='bg-white rounded-2xl p-6 shadow-lg'
          >
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              📱 오늘의 추천 주종
            </h3>
            <div className='space-y-3'>
              {result.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center p-3 bg-gray-50 rounded-xl'
                >
                  <div>
                    <span className='font-semibold text-gray-800'>
                      {rec.type}
                    </span>
                    <div className='text-sm text-gray-600'>
                      {rec.description}
                    </div>
                  </div>
                  <div className='text-lg font-bold text-pink-500'>
                    {rec.amount}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 음주 스케줄 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='bg-white rounded-2xl p-6 shadow-lg'
          >
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              ⏰ 음주 스케줄
            </h3>
            <div className='space-y-2'>
              {result.schedule.map((item, index) => (
                <div key={index} className='flex items-center gap-3 p-2'>
                  <Clock className='w-4 h-4 text-gray-400' />
                  <span className='font-medium text-gray-700'>{item.time}</span>
                  <span className='text-gray-600'>{item.activity}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 귀가 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className='bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6'
          >
            <h3 className='text-lg font-bold text-gray-800 mb-3'>
              🚗 집 가는 시간
            </h3>
            <div className='flex items-center gap-2 mb-2'>
              <Home className='w-5 h-5 text-gray-600' />
              <span className='font-semibold'>{result.goHomeTime}</span>
            </div>
            <div className='text-sm text-gray-600'>{result.goHomeMethod}</div>
          </motion.div>

          {/* 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className='space-y-3 pt-4'
          >
            <Button onClick={handleShare}>
              <div className='flex items-center justify-center gap-2'>
                <Share2 className='w-5 h-5' />
                테스트 공유하기 📸
              </div>
            </Button>

            <Button onClick={handleRestart} variant='secondary'>
              <div className='flex items-center justify-center gap-2'>
                <RotateCcw className='w-5 h-5' />
                다시 테스트하기
              </div>
            </Button>

            {/* <Button onClick={() => setShowPremiumModal(true)} variant="secondary">
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-5 h-5" />
              프리미엄 기능 보기 ✨
            </div>
          </Button> */}
          </motion.div>

          {/* <AdBanner position="bottom" /> */}
        </div>
      </PageContainer>

      {/* <PremiumModal 
      isOpen={showPremiumModal}
      onClose={() => setShowPremiumModal(false)}
      onUpgrade={handlePremiumUpgrade}
    /> */}
    </>
  );
};
