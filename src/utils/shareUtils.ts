import html2canvas from 'html2canvas';

// 이미지 생성 및 다운로드
export const generateAndDownloadImage = async (elementId: string, filename: string = 'alcohol-test-result') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // html2canvas 옵션 설정
    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    // Canvas를 Blob으로 변환
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      // 다운로드 링크 생성
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = url;
      
      // 자동 다운로드 실행
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 메모리 정리
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0);

    return true;
  } catch (error) {
    console.error('이미지 생성 실패:', error);
    return false;
  }
};


// 카카오톡 공유
export const shareToKakao = (title: string, description: string, imageUrl?: string, webUrl?: string) => {
  if (typeof window !== 'undefined' && (window as any).Kakao) {
    const Kakao = (window as any).Kakao;
    
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl || window.location.origin + '/og-image.png',
        link: {
          mobileWebUrl: webUrl || window.location.href,
          webUrl: webUrl || window.location.href
        }
      },
      buttons: [
        {
          title: '나도 테스트하기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin
          }
        }
      ]
    });
  } else {
    // 카카오 SDK가 없으면 링크 복사로 대체
    copyToClipboard(window.location.href);
    alert('카카오톡 공유가 지원되지 않습니다. 링크가 복사되었습니다!');
  }
};


// 범용 소셜 공유 (Web Share API)
export const shareToSocial = async (title: string, text: string, url?: string) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: text,
        url: url || window.location.href
      });
    } else {
      // Web Share API 미지원시 클립보드 복사
      const shareText = `${title}\n\n${text}\n\n${url || window.location.href}`;
      await copyToClipboard(shareText);
      alert('공유 내용이 복사되었습니다! 원하는 앱에 붙여넣기 해주세요 📱');
    }
  } catch (error) {
    console.error('소셜 공유 실패:', error);
  }
};

// 클립보드 복사
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return false;
  }
};

// 모바일 기기 감지
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};


// 카카오톡 앱 감지
export const isKakaoTalkApp = (): boolean => {
  return /KAKAOTALK/i.test(navigator.userAgent);
};