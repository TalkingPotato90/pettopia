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

  const POSTS_PER_PAGE = 10; // 페이지당 게시글 수
  const initialPage = Math.ceil(parseInt(postId, 10) / POSTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const currentPost = posts.find((post) => post.id === parseInt(postId, 10));

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [postId]);

  if (!currentPost) {
    return <Typography>게시글을 찾을 수 없습니다.</Typography>;
  }

  const handleRecommendChange = (newRecommend) => {
    updatePostRecommend(currentPost.id, newRecommend); // 추천수 업데이트
  };

  return (
    <Stack spacing={4} sx={{ padding: '16px' }}>
      {/* 상세 글 내용 */}
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
          comments={[]}
          newComment=""
          onCommentChange={() => {}}
          onAddComment={() => {}}
        />
      </Paper>

      {/* 게시글 목록 및 페이지네이션 */}
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
