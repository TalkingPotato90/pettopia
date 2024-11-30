import { Button, Stack, styled, TextField, Typography } from '@mui/material';
import CommunityTable from '../components/CommunityTable';
import MuiCard from '@mui/material/Card';
import ContainerTheme from '../theme/ContainerTheme';
import { useNavigate } from 'react-router-dom';

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

export default function Home({ posts }) {
  const rows = posts.map((post) => ({
    id: post.id,
    title: post.title,
    author: post.author,
    date: post.date,
    view: post.view,
    recommend: post.recommend,
  }));

  const link = useNavigate();

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
            sortedRows={rows}
            columns={[]}
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
            <div>로그인하고 편리하게 이용하세요</div>
            <Button variant="contained" onClick={() => link('/home/login')}>
              로그인
            </Button>
          </Stack>
        </LoginCard>
      </Stack>
    </ContainerTheme>
  );
}
