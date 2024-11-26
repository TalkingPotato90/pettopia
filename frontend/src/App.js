import './App.css';
import { Route, Routes } from 'react-router-dom';
import FreeBoard from './pages/FreeBoard';
import MyPageMain from './pages/MyPageMain';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';

const posts = [
  {
    id: 1,
    title: '강아지와 산책하기 좋은 장소 추천',
    author: '멍멍이 주인',
    content: '강아지와 산책할 때 좋은 장소로는 공원이나 강변이 있어요!',
    date: '2024.11.20',
  },
  {
    id: 2,
    title: '고양이가 좋아하는 장난감 추천',
    author: '야옹이 사랑',
    content: '고양이는 낚싯대 장난감이나 레이저 포인터를 정말 좋아해요!',
    date: '2024.11.21',
  },
  {
    id: 3,
    title: '햄스터를 키울 때 주의해야 할 점',
    author: '작은 친구',
    content: '햄스터는 스트레스에 민감해서 조용한 환경에서 키워야 해요.',
    date: '2024.11.22',
  },
  {
    id: 4,
    title: '물고기 수족관 꾸미는 꿀팁',
    author: '수족관 매니아',
    content: '수족관을 꾸밀 때 자연스러운 돌과 식물을 사용하는 것이 좋아요.',
    date: '2024.11.23',
  },
  {
    id: 5,
    title: '토끼가 좋아하는 음식',
    author: '토끼나라',
    content: '토끼는 신선한 채소와 건초를 주로 먹고, 과일은 간식으로만 주세요.',
    date: '2024.11.24',
  },
  {
    id: 6,
    title: '반려동물 보험의 필요성',
    author: '보험 전문가',
    content: '반려동물 보험은 예상치 못한 의료비를 대비하기 위해 필요합니다.',
    date: '2024.11.25',
  },
  {
    id: 7,
    title: '앵무새 훈련하기',
    author: '새 친구',
    content: '앵무새는 똑똑해서 훈련이 가능하며, 보상으로 씨앗을 줄 수 있어요.',
    date: '2024.11.26',
  },
  {
    id: 8,
    title: '고슴도치를 위한 집 꾸미기',
    author: '고슴도치 주인',
    content: '고슴도치는 은신처와 바닥재가 꼭 필요해요.',
    date: '2024.11.27',
  },
  {
    id: 9,
    title: '반려동물과 함께 여행하기',
    author: '여행 매니아',
    content: '반려동물과 함께 여행하려면 이동장과 필요한 물품을 준비해야 해요.',
    date: '2024.11.28',
  },
  {
    id: 10,
    title: '강아지 훈련시키는 방법',
    author: '훈련사',
    content:
      '강아지 훈련은 일관성이 가장 중요하며, 긍정적인 보상을 활용하세요.',
    date: '2024.11.29',
  },
  {
    id: 11,
    title: '반려동물 입양 전 체크리스트',
    author: '입양센터',
    content: '반려동물 입양 전에 시간과 비용, 환경을 잘 고려해야 합니다.',
    date: '2024.11.30',
  },
  {
    id: 12,
    title: '고양이 털 관리 꿀팁',
    author: '고양이 주인',
    content:
      '고양이 털 관리는 빗질을 자주 해주고, 털 제거기를 사용하는 것이 좋아요.',
    date: '2024.12.01',
  },
];

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/community/freeboard"
          element={<FreeBoard posts={posts} />}
        />
        <Route path="/mypage/main" element={<MyPageMain />} />
        <Route
          path="/community/postdetail/:postId"
          element={<PostDetail posts={posts} />}
        />
        <Route path="/home/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
