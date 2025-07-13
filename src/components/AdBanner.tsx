import { motion } from 'framer-motion';

interface AdBannerProps {
  position?: 'top' | 'bottom';
}

export const AdBanner = ({ position = 'bottom' }: AdBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full bg-gradient-to-r from-purple-400 to-pink-400 p-3 text-center text-white text-sm ${
        position === 'top' ? 'mb-4' : 'mt-4'
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <span>🍺</span>
        <span>술집 찾기 어려우시나요? "주변 맛집" 앱 다운로드!</span>
        <span>🍻</span>
      </div>
      <div className="text-xs opacity-80 mt-1">
        광고 | 클릭하면 앱스토어로 이동
      </div>
    </motion.div>
  );
};