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

const PostDetail = ({ posts }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme(); // 현재 테마 가져오기 (라이트/다크 모드)

  const POSTS_PER_PAGE = 10; // 페이지당 게시글 수
  const initialPage = Math.ceil(parseInt(postId) / POSTS_PER_PAGE); // 초기 페이지 계산
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE); // 전체 페이지 수 계산
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const currentPostIndex = posts.findIndex(
    (post) => post.id === parseInt(postId),
  );

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 변경
  };

  useEffect(() => {
    setCurrentPage(initialPage); // URL 이동 시 페이지 초기화
  }, [postId]);

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
          {posts[currentPostIndex]?.title || '제목 없음'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          작성자: {posts[currentPostIndex]?.author || '익명'} | 작성일:{' '}
          {posts[currentPostIndex]?.date || '날짜 없음'}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '16px' }}>
          {posts[currentPostIndex]?.content || '내용 없음'}
        </Typography>
        <ReactionButtons />
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
                  <TableCell align="center">
                    {Math.floor(Math.random() * 1000) + 1}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} sx={{ marginTop: '16px', alignItems: 'center' }}>
          <Pagination
            count={totalPages} // 총 페이지 수
            page={currentPage} // 현재 페이지
            onChange={handlePageChange} // 페이지 변경 핸들러
            color="primary"
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default PostDetail;
