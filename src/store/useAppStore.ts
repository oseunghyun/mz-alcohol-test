import { create } from 'zustand';
import type { UserData, DrinkingResult, PageType } from '../types';

interface AppState {
  currentPage: PageType;
  userData: Partial<UserData>;
  result: DrinkingResult | null;
  
  setCurrentPage: (page: PageType) => void;
  updateUserData: (data: Partial<UserData>) => void;
  calculateResult: () => void;
  resetData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: 'main',
  userData: {
    todayCondition: {}
  },
  result: null,

  setCurrentPage: (page) => set({ currentPage: page }),

  updateUserData: (data) => set((state) => ({
    userData: { ...state.userData, ...data }
  })),

  calculateResult: () => {
    const { userData } = get();
    
    if (!userData.normalDrinking || !userData.todayCondition) return;

    let basePercentage = 100;
    
    // 수면 점수 계산
    const sleepHours = userData.todayCondition.sleep || 7;
    if (sleepHours <= 3) basePercentage -= 40;
    else if (sleepHours <= 6) basePercentage -= 20;
    else if (sleepHours >= 9) basePercentage -= 10;

    // 식사 점수 계산
    const meal = userData.todayCondition.meal || 'light';
    if (meal === 'empty') basePercentage -= 30;
    else if (meal === 'light') basePercentage -= 10;

    // 기분 점수 계산
    const mood = userData.todayCondition.mood || 'good';
    if (mood === 'stressed') basePercentage -= 15;
    else if (mood === 'tired') basePercentage -= 10;
    else if (mood === 'good') basePercentage += 5;

    // 최종 퍼센트 계산
    const finalPercentage = Math.max(10, Math.min(100, basePercentage));
    
    // 등급 계산
    let level: DrinkingResult['level'];
    if (finalPercentage >= 95) level = 'SSS';
    else if (finalPercentage >= 85) level = 'S';
    else if (finalPercentage >= 70) level = 'A';
    else if (finalPercentage >= 50) level = 'B';
    else if (finalPercentage >= 30) level = 'C';
    else level = 'D';

    // 추천 주량 계산
    const beerAmount = Math.floor((userData.normalDrinking.beer * finalPercentage) / 100);
    const sojuAmount = ((userData.normalDrinking.soju * finalPercentage) / 100).toFixed(1);
    const wineAmount = Math.floor((userData.normalDrinking.wine * finalPercentage) / 100);

    const recommendations = [
      {
        type: '맥주',
        amount: `${beerAmount}캔`,
        description: '치킨이랑 캔맥 조합 어때?'
      },
      {
        type: '소주',
        amount: `${sojuAmount}병`,
        description: '소맥 타지 말고 스트레이트로'
      },
      {
        type: '와인',
        amount: `${wineAmount}잔`,
        description: '오늘 분위기 내고 싶다면'
      }
    ];

    const schedule = [
      { time: '7시', activity: '첫 잔 까자 🍻' },
      { time: '8시', activity: '슬슬 텐션 올라가는 중' },
      { time: '9시', activity: '지금이 골든타임' },
      { time: '10시', activity: '마지막 한 잔?' },
      { time: '11시', activity: '이제 그만, 귀가 타임' }
    ];

    let goHomeTime, goHomeMethod;
    if (finalPercentage >= 80) {
      goHomeTime = '10시 30분';
      goHomeMethod = '대리 미리 불러놔';
    } else if (finalPercentage >= 60) {
      goHomeTime = '11시 30분';
      goHomeMethod = '지하철 막차 시간 체크해';
    } else {
      goHomeTime = '12시';
      goHomeMethod = '산책하며 집에 가자';
    }

    const result: DrinkingResult = {
      level,
      percentage: finalPercentage,
      recommendations,
      schedule,
      goHomeTime,
      goHomeMethod
    };

    set({ result });
  },

  resetData: () => set({ userData: { todayCondition: {} }, result: null, currentPage: 'main' })
}));