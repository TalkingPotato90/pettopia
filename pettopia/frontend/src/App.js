import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import FreeBoard from './pages/FreeBoard';
import MyPageMain from './pages/MyPageMain';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/community/freeboard" element={<FreeBoard />}/>
        <Route path="/mypage/main" element={<MyPageMain />}/>
      </Routes>
    </div>
  );
}

export default App;
