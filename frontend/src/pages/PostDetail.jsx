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

const PostDetail = ({ updatePostRecommend }) => {
  const { postId: routePostId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [post, setPost] = useState(null); // 현재 게시글 상태
  const [posts, setPosts] = useState([]); // 전체 게시글 상태
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  // 현재 게시글 데이터 로드
  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostById(routePostId);
        setPost(data);
      } catch (error) {
        console.error('게시글 로드 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [routePostId]);

  // 전체 게시글 리스트 로드
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPost();
        setPosts(data);
      } catch (error) {
        console.error('게시글 리스트 로드 중 오류 발생:', error);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(`/freeboard/comment/${routePostId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // 댓글이 중복되면 안되므로, 기존 댓글과 합칠 때 중복을 피해야 함
        setComments((prevComments) => {
          const newComments = data.filter(
            (newComment) =>
              !prevComments.some(
                (existingComment) =>
                  existingComment.commentId === newComment.commentId,
              ),
          );
          return [...prevComments, ...newComments]; // 새 댓글만 추가
        });
      } catch (error) {
        console.error('댓글 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    loadComments();
  }, [routePostId]); // routePostId 변경 시에만 데이터 로드

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <Typography>게시글을 찾을 수 없습니다.</Typography>;
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (parentId, content) => {
    if (!content.trim()) return;
    const newCommentObj = {
      commentId: Date.now(),
      parentId,
      content,
      nickname: '익명',
      createdAt: new Date().toISOString(),
    };
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment('');
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
          <Typography variant="body1" sx={{ marginTop: '16px' }}>
            {post.content || '내용 없음'}
          </Typography>
          <ReactionButtons
            recommend={post.recommend}
            onRecommendChange={handleRecommendChange}
          />
          <CommentSection
            comments={comments}
            newComment={newComment}
            onCommentChange={handleCommentChange}
            onAddComment={handleAddComment}
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
