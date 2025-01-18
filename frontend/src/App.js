import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyPageMain from './pages/MyPageMain';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import TopNavBar from './components/TopNavBar';
import PostWrite from './pages/PostWrite';
import { CssBaseline } from '@mui/material';
import AppTheme from './theme/AppTheme';
import Home from './pages/Home';
import MyPageActivity from './pages/MyPageActivity';
import myPosts from './data/myPosts';
import Footer from './components/Footer';
import { checkSocialLoginStatus, logoutSocialLogin } from './api/auth'; // API 호출 추가
import { fetchPost } from './api/fetchPost'; // 게시글 데이터 API
import PrivateRoute from './components/PrivateRoute';
import FreeBoardPage from './pages/FreeBoardPage';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 로그인 상태
  const [userName, setUserName] = useState(''); // 사용자 이름
  const [profileImgUrl, setProfileImgUrl] = useState(''); // 프로필 이미지 경로
  const [posts, setPosts] = useState([]); // posts 상태 관리

  // 게시글 데이터 로드
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPost(); // API 호출
        setPosts(data); // 상태 업데이트
      } catch (error) {
        console.error('게시글 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    loadPosts();
  }, []);

  // 로그인 상태 확인
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const status = await checkSocialLoginStatus(); // 로그인 상태 확인
        setIsLoggedIn(status.isLoggedIn);
        setUserName(status.userName || '');
        setProfileImgUrl(status.profileImgUrl || '');
      } catch (error) {
        setIsLoggedIn(false); // 로그인 상태를 false로 설정
        setUserName('');
        setProfileImgUrl('');
      }
    };
    fetchLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // 로그인 상태를 확인 중일 때 로딩 표시
  }

  // 로그인 핸들러
  const handleLogin = (name, profileImgUrl) => {
    setIsLoggedIn(true);
    setUserName(name);
    setProfileImgUrl(profileImgUrl);
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await logoutSocialLogin(); // 로그아웃 API 호출
      setIsLoggedIn(false);
      setUserName('');
      setProfileImgUrl('');
    } catch (error) {
      setIsLoggedIn(false);
      setUserName('');
      setProfileImgUrl('');
    }
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
      <TopNavBar
        isLoggedIn={isLoggedIn}
        userName={userName}
        profileImgUrl={profileImgUrl}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <Home posts={posts} isLoggedIn={isLoggedIn} userName={userName} />
          }
        />
        <Route path="/community/freeboard" element={<FreeBoardPage />} />
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

        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/mypage/main" element={<MyPageMain />} />
          <Route
            path="/mypage/activity"
            element={<MyPageActivity myPosts={myPosts} />}
          />
        </Route>
      </Routes>
      <Footer />
    </AppTheme>
  );
}

export default App;
