import { motion } from 'framer-motion';
import { Copy, Download, ArrowLeft } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';

export const SharePage = () => {
  const { result, setCurrentPage } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const getLevelInfo = (level: string) => {
    const levels = {
      SSS: { emoji: '👑', text: '오늘 주신이 강림했다' },
      S: { emoji: '🔥', text: '오늘 개잘마셔' },
      A: { emoji: '👍', text: '그럭저럭 ㄱㄴ' },
      B: { emoji: '🤔', text: '적당히 해' },
      C: { emoji: '🏠', text: '집에서 캔맥이나' },
      D: { emoji: '💧', text: '오늘은 물' }
    };
    return levels[level as keyof typeof levels];
  };

  const levelInfo = getLevelInfo(result.level);

  const shareText = `오늘의 주량 테스트 결과! 🍺

${levelInfo.emoji} ${result.level}급 - ${levelInfo.text}
평소의 ${result.percentage}% 파워!

추천 주량:
🍺 맥주 ${result.recommendations[0].amount}
🍶 소주 ${result.recommendations[1].amount}
🍷 와인 ${result.recommendations[2].amount}

너도 테스트해보자! 
#오늘술얼마나ㄱㄴ #주량테스트 #MZ술친구`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const handleDownloadImage = () => {
    // 실제로는 canvas나 html2canvas를 사용해서 이미지를 생성해야 함
    alert('이미지 다운로드 기능은 개발 예정입니다! 📸');
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setCurrentPage('result')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">공유하기</h1>
        </div>

        {/* 공유용 카드 미리보기 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 p-6 rounded-3xl text-white"
        >
          <div className="text-center space-y-4">
            <div className="text-5xl">{levelInfo.emoji}</div>
            <div className="text-2xl font-bold">오늘의 주량 레벨</div>
            <div className="text-4xl font-black">{result.level}급</div>
            <div className="text-lg">{levelInfo.text}</div>
            <div className="text-xl font-bold">평소의 {result.percentage}% 파워!</div>
            
            <div className="bg-white/20 rounded-2xl p-4 text-sm">
              <div className="font-semibold mb-2">오늘의 추천 주량</div>
              <div className="space-y-1">
                <div>🍺 맥주 {result.recommendations[0].amount}</div>
                <div>🍶 소주 {result.recommendations[1].amount}</div>
                <div>🍷 와인 {result.recommendations[2].amount}</div>
              </div>
            </div>
            
            <div className="text-xs opacity-80">
              "오늘 술 얼마나 ㄱㄴ?" 테스트
            </div>
          </div>
        </motion.div>

        {/* 텍스트 공유 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-4"
        >
          <div className="text-sm font-medium text-gray-700 mb-2">공유 텍스트</div>
          <div className="bg-white rounded-xl p-4 text-sm text-gray-600 whitespace-pre-line border">
            {shareText}
          </div>
        </motion.div>

        {/* 공유 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Button onClick={handleCopyText}>
            <div className="flex items-center justify-center gap-2">
              <Copy className="w-5 h-5" />
              {copied ? '복사됨! ✅' : '텍스트 복사하기'}
            </div>
          </Button>
          
          <Button onClick={handleDownloadImage} variant="secondary">
            <div className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              이미지로 저장하기 📸
            </div>
          </Button>
        </motion.div>

        {/* 소셜 링크들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl font-medium">
            인스타 스토리
          </button>
          <button className="bg-yellow-400 text-gray-800 p-4 rounded-2xl font-medium">
            카카오톡
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-gray-500 pt-4"
        >
          친구들과 함께 테스트해보세요! 🍻
        </motion.div>
      </div>
    </PageContainer>
  );
};