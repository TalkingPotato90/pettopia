import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  useTheme,
} from '@mui/material';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';

const PostDetail = ({ posts, updatePostRecommend }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const POSTS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const currentPost = posts.find((post) => post.id === parseInt(postId, 10));

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  useEffect(() => {
    // 게시물을 변경할 때 댓글 초기화
    setComments([]);
    // 또는 서버에서 댓글 데이터를 가져옴
    fetch(`/api/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) =>
        console.error('댓글 데이터를 가져오는 중 오류 발생:', error),
      );
  }, [postId]);

  useEffect(() => {
    const initialPage = Math.ceil(parseInt(postId, 10) / POSTS_PER_PAGE);
    setCurrentPage(initialPage);
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (parentId, content) => {
    if (!content.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      parentId,
      content,
      author: '익명',
      date: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment('');
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentPost) {
    return <Typography>게시글을 찾을 수 없습니다.</Typography>;
  }

  const handleRecommendChange = (newRecommend) => {
    updatePostRecommend(currentPost.id, newRecommend);
  };

  return (
    <Stack spacing={4} sx={{ padding: '16px' }}>
      <Paper
        sx={{
          padding: '16px',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {currentPost.title || '제목 없음'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          작성자: {currentPost.author || '익명'} | 작성일:{' '}
          {currentPost.date || '날짜 없음'} | 조회수: {currentPost.view}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '16px' }}>
          {currentPost.content || '내용 없음'}
        </Typography>
        <ReactionButtons
          recommend={currentPost.recommend}
          onRecommendChange={handleRecommendChange}
        />
        <CommentSection
          comments={comments}
          newComment={newComment}
          onCommentChange={handleCommentChange}
          onAddComment={handleAddComment}
        />
      </Paper>
      <Box>
        <TableContainer
          component={Paper}
          sx={{ border: '1px solid', borderColor: theme.palette.divider }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작성자</TableCell>
                <TableCell align="center">작성일</TableCell>
                <TableCell align="center">조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPosts.map((post) => (
                <TableRow key={post.id} hover>
                  <TableCell align="center">{post.id}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      cursor: 'pointer',
                      color: theme.palette.primary.main,
                    }}
                    onClick={() => navigate(`/community/postdetail/${post.id}`)}
                  >
                    {post.title}
                  </TableCell>
                  <TableCell align="center">{post.author}</TableCell>
                  <TableCell align="center">{post.date}</TableCell>
                  <TableCell align="center">{post.view}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  );
};

export default PostDetail;
