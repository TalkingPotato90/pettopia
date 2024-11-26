import './App.css';
import { Route, Routes } from 'react-router-dom';
import FreeBoard from './pages/FreeBoard';
import MyPageMain from './pages/MyPageMain';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/community/freeboard" element={<FreeBoard />} />
        <Route path="/mypage/main" element={<MyPageMain />} />
        <Route path="/community/postdetail" element={<PostDetail />} />
        <Route path="/home/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
