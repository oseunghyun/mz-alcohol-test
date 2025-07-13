import { motion } from 'framer-motion';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';

export const MainPage = () => {
  const { setCurrentPage } = useAppStore();

  return (
    <PageContainer>
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl mb-4"
        >
          🍺
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            오늘 술 얼마나 <span className="text-pink-500">ㄱㄴ</span>?
          </h1>
          <p className="text-lg text-gray-600">
            너의 오늘 주량 레벨을 테스트해줄게
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mx-4"
        >
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-center gap-2">
              <span>💤</span>
              <span>수면 시간</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🍗</span>
              <span>식사 상태</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>😎</span>
              <span>오늘 기분</span>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              과학적으로 계산된 맞춤형 주량 추천!
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-8"
        >
          <Button onClick={() => setCurrentPage('basic-info')}>
            ㄱㄱ 테스트 시작! 🚀
          </Button>
        </motion.div>
      </div>
    </PageContainer>
  );
};