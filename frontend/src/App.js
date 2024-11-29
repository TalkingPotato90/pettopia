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
import postsData from './data/posts'; // posts 데이터
import Home from './pages/Home';
import MyPageActivity from './pages/MyPageActivity';
import myPosts from './data/myPosts';
import Footer from './components/Footer';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [posts, setPosts] = useState(postsData); // posts 상태 관리

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 추천수 업데이트 함수
  const updatePostRecommend = (postId, newRecommend) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, recommend: newRecommend } : post,
      ),
    );
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
          element={
            <PostDetail
              posts={posts}
              updatePostRecommend={updatePostRecommend} // 추천수 업데이트 함수 전달
            />
          }
        />
        <Route path="/home/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/community/postwrite" element={<PostWrite />} />
        <Route
          path="/mypage/activity"
          element={<MyPageActivity myPosts={myPosts} />}
        />
      </Routes>
      <Footer />
    </AppTheme>
  );
}

export default App;
