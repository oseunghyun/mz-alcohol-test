export interface UserData {
  normalDrinking: {
    beer: number;
    soju: number;
    wine: number;
  };
  todayCondition: {
    sleep?: number;
    meal?: 'empty' | 'light' | 'heavy';
    mood?: 'stressed' | 'tired' | 'good';
  };
}

export interface DrinkingResult {
  level: 'SSS' | 'S' | 'A' | 'B' | 'C' | 'D';
  percentage: number;
  recommendations: {
    type: string;
    amount: string;
    description: string;
  }[];
  schedule: {
    time: string;
    activity: string;
  }[];
  goHomeTime: string;
  goHomeMethod: string;
}

export type PageType = 'main' | 'basic-info' | 'sleep' | 'meal' | 'mood' | 'result' | 'share';