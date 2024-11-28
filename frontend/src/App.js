import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FreeBoard from './pages/FreeBoard';
import MyPageMain from './pages/MyPageMain';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import TopNavBar from './components/TopNavBar';
import PostWrite from './pages/PostWrite';
import { CssBaseline } from '@mui/material';
import AppTheme from './theme/AppTheme';
import posts from './data/posts'; // 외부 데이터 파일 import
import Home from './pages/Home';
import MyPageActivity from './pages/MyPageActivity';
import myPosts from './data/myPosts';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <TopNavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/community/freeboard"
          element={<FreeBoard posts={posts} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/mypage/main" element={<MyPageMain />} />
        <Route
          path="/community/postdetail/:postId"
          element={<PostDetail posts={posts} />}
        />
        <Route path="/home/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/community/postwrite" element={<PostWrite />} />
        <Route
          path="/mypage/activity"
          element={<MyPageActivity myPosts={myPosts} />}
        />
      </Routes>
    </AppTheme>
  );
}

export default App;
