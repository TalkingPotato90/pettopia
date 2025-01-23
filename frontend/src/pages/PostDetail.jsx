import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Pagination,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';
import { fetchPost, fetchPostById } from '../api/fetchPost';
import CommunityTable from '../components/CommunityTable';
import ContainerTheme from '../theme/ContainerTheme';
import DOMPurify from 'dompurify';

const PostDetail = ({ user, updatePostRecommend }) => {
  const { postId: routePostId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [post, setPost] = useState(null); // 현재 게시글 상태
  const [posts, setPosts] = useState([]); // 전체 게시글 상태
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]); // 댓글 상태
  const [newComment, setNewComment] = useState(''); // 새 댓글 내용
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const POSTS_PER_PAGE = 10;

  const columns = [
    { id: 'id', label: '글번호', minWidth: 25 },
    { id: 'title', label: '제목', minWidth: 200 },
    { id: 'author', label: '작성자', minWidth: 80 },
    { id: 'date', label: '작성일', minWidth: 80 },
    { id: 'view', label: '조회수', minWidth: 35 },
    { id: 'recommend', label: '추천수', minWidth: 35 },
  ];

  const rows = posts.map((post) => ({
    id: post.postId,
    title: post.title,
    author: post.author,
    date: new Date(post.createdAt).toLocaleDateString(),
    view: post.view,
    recommend: post.recommend,
  }));

  const paginatedRows = rows.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // 게시글 조회, 게시글 목록 조회
  useEffect(() => {
    const loadPostAndList = async () => {
      try {
        // 현재 게시글 조회
        const postData = await fetchPostById(routePostId);
        setPost(postData);

        // 게시글 목록 조회
        const postsData = await fetchPost();
        setPosts(
          postsData.map((post) =>
            post.postId === routePostId
              ? { ...post, view: postData.view }
              : post,
          ),
        );
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPostAndList();
  }, [routePostId]);

  // 댓글 데이터 로드
  const loadComments = async () => {
    try {
      const response = await fetch(`/freeboard/comment/${routePostId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data); // 댓글 상태 갱신
    } catch (error) {
      console.error('댓글 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    loadComments(); // 댓글 초기 로드
  }, [routePostId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <Typography>게시글을 찾을 수 없습니다.</Typography>;
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // 댓글 작성 함수
  const handleAddComment = async (content) => {
    if (!user.isLoggedIn) {
      // 로그인되지 않은 경우
      navigate('/home/login', {
        state: { from: '/community/postdetail/' + routePostId },
      });
      return;
    }

    const newCommentObj = {
      content,
      postId: routePostId,
      userId: user.userId,
    };

    try {
      // 백엔드로 댓글 전송
      const response = await fetch(`/freeboard/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommentObj),
      });

      if (!response.ok) {
        throw new Error('댓글 작성 실패');
      }

      // 댓글 작성 후 댓글 목록 새로 고침
      loadComments(); // 댓글 목록을 새로 불러오는 함수 호출
      setNewComment(''); // 댓글 입력란 초기화
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRecommendChange = (newRecommend) => {
    updatePostRecommend(post.id, newRecommend);
  };

  const handleRowClick = (id) => {
    navigate(`/community/postDetail/${id}`);
  };

  const sanitizedContent = DOMPurify.sanitize(post.content, {});

  return (
    <ContainerTheme direction="column" justifyContent="space-between">
      <Stack spacing={4} sx={{ padding: '16px' }}>
        {/* 현재 게시글 정보 */}
        <Paper
          sx={{
            padding: '16px',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {post.title || '제목 없음'}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            작성자: {post.author || '익명'} | 작성일:{' '}
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : '날짜 없음'}{' '}
            | 조회수: {post.view}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginTop: '16px' }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <ReactionButtons
            recommend={post.recommend}
            onRecommendChange={handleRecommendChange}
          />
          <CommentSection
            comments={comments}
            newComment={newComment}
            onCommentChange={handleCommentChange}
            onAddComment={handleAddComment}
            user={user}
          />
        </Paper>

        {/* 게시글 리스트 */}
        <Box>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            자유게시판
          </Typography>
          <CommunityTable
            page={currentPage}
            rowsPerPage={POSTS_PER_PAGE}
            sortedRows={paginatedRows}
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick} // 행 클릭 시 상세 페이지 이동
          />
          <Stack spacing={2} sx={{ marginTop: '16px', alignItems: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Box>
      </Stack>
    </ContainerTheme>
  );
};

export default PostDetail;
