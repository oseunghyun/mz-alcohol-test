import { motion } from 'framer-motion';
import { X, Crown, Star, Users, TrendingUp } from 'lucide-react';
import { Button } from './Button';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const PremiumModal = ({ isOpen, onClose, onUpgrade }: PremiumModalProps) => {
  if (!isOpen) return null;

  const premiumFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: '친구들과 주량 비교',
      description: '우리 중에 누가 제일 잘 마셔?'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: '주량 변화 분석',
      description: '지난달 대비 주량이 어떻게 변했는지'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '프리미엄 추천',
      description: '개인 맞춤 칵테일 레시피 추천'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold">프리미엄 업그레이드</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="text-purple-500 mt-1">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">₩2,900</div>
            <div className="text-sm text-gray-600">한 달 무제한 이용</div>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={onUpgrade}>
            프리미엄으로 업그레이드 👑
          </Button>
          <Button onClick={onClose} variant="secondary">
            나중에 하기
          </Button>
        </div>

        <div className="text-xs text-gray-400 text-center mt-4">
          언제든지 취소 가능 • 첫 7일 무료 체험
        </div>
      </motion.div>
    </div>
  );
};