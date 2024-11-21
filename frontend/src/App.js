import './App.css';
import { Route, Routes } from 'react-router-dom';
import FreeBoard from './pages/FreeBoard';
import MyPageMain from './pages/MyPageMain';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/community/freeboard" element={<FreeBoard />} />
        <Route path="/mypage/main" element={<MyPageMain />} />
        <Route path="/community/postdetail" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
