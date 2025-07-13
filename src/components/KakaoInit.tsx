import { useEffect } from 'react';

// 카카오 테스트용 앱 키 (실제 서비스에서는 환경변수로 관리)
const KAKAO_APP_KEY = '2866a71fb553e7e90d6abcfe2e0b9903'; // 테스트용 공개키

export const KakaoInit = () => {
  useEffect(() => {
    // 카카오 SDK 초기화
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      const Kakao = (window as any).Kakao;

      if (!Kakao.isInitialized()) {
        Kakao.init('KAKAO_APP_KEY');
        console.log('Kakao SDK 초기화 완료:', Kakao.isInitialized());
      }
    }
  }, []);

  return null; // 화면에 렌더링하지 않음
};
