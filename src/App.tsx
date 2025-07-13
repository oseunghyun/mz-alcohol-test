import { useAppStore } from './store/useAppStore';
import { MainPage } from './pages/MainPage';
import { BasicInfoPage } from './pages/BasicInfoPage';
import { SleepPage } from './pages/SleepPage';
import { MealPage } from './pages/MealPage';
import { MoodPage } from './pages/MoodPage';
import { ResultPage } from './pages/ResultPage';
import { SharePage } from './pages/SharePage';
import { KakaoInit } from './components/KakaoInit';

function App() {
  const { currentPage } = useAppStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage />;
      case 'basic-info':
        return <BasicInfoPage />;
      case 'sleep':
        return <SleepPage />;
      case 'meal':
        return <MealPage />;
      case 'mood':
        return <MoodPage />;
      case 'result':
        return <ResultPage />;
      case 'share':
        return <SharePage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="min-h-screen">
      <KakaoInit />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
