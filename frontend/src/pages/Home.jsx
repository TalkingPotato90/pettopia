import { Button, Stack, styled, TextField, Typography } from '@mui/material';
import CommunityTable from '../components/CommunityTable';
import MuiCard from '@mui/material/Card';
import ContainerTheme from '../theme/ContainerTheme';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPost } from '../api/fetchPost';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: '300px',
  alignSelf: 'flex-start',
  padding: theme.spacing(2),
}));

export default function Home({ isLoggedIn, userName }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const link = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPost();
        const formattedPosts = data.map((post) => ({
          id: post.postId,
          title: post.title,
          author: post.author,
          date: new Date(post.createdAt).toLocaleDateString(),
          view: post.view || 0,
          recommend: post.recommend || 0,
        }));
        setPosts(formattedPosts);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) return <div>데이터 불러오기</div>;

  const columns = [
    { id: 'id', label: '글번호', minWidth: 25 },
    { id: 'title', label: '제목', minWidth: 200 },
    { id: 'author', label: '작성자', minWidth: 80 },
    {
      id: 'date',
      label: '작성일',
      minWidth: 80,
      format: (value) => value.toLocaleDateString(),
    },
    { id: 'view', label: '조회수', minWidth: 35 },
    { id: 'recommend', label: '추천수', minWidth: 35 },
  ];

  return (
    <ContainerTheme
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        style={{ width: '100%', maxWidth: '600px' }}
      >
        <TextField fullWidth placeholder="검색할 내용" />
        <Button variant="contained">검색</Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={4}
        style={{ width: '80%' }}
      >
        <Card
          variant="outlined"
          style={{
            flexBasis: '70%',
            maxWidth: '70%',
            minWidth: 0,
          }}
        >
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
            커뮤니티
          </Typography>
          <CommunityTable
            page={1}
            rowsPerPage={5}
            sortedRows={posts}
            columns={columns}
            sx={{ border: 'none' }}
          />
        </Card>
        <LoginCard
          variant="outlined"
          style={{
            flexBasis: '30%',
            maxWidth: '30%',
            minWidth: 0,
          }}
        >
          <Stack direction="column" alignItems="center" spacing={2}>
            {/* 로그인 여부에 따라 메시지와 버튼 변경 */}
            {isLoggedIn ? (
              <>
                <Typography variant="body1">
                  안녕하세요, <strong>{userName}</strong>님!
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => link('/mypage/main')}
                  sx={{
                    fontSize: '12px',
                  }}
                >
                  마이 페이지
                </Button>
              </>
            ) : (
              <>
                <div>로그인하고 편리하게 이용하세요</div>
                <Button
                  variant="contained"
                  onClick={() => link('/home/login')}
                  sx={{
                    fontSize: '12px',
                  }}
                >
                  로그인
                </Button>
              </>
            )}
          </Stack>
        </LoginCard>
      </Stack>
    </ContainerTheme>
  );
}
