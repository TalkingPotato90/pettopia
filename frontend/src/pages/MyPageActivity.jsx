import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Stack,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import PropTypes from 'prop-types';
import { getUserPosts, getUserComments } from '../api/user';
import ContainerTheme from '../theme/ContainerTheme';

function MyPageActivity() {
  const [myPosts, setMyPosts] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const dataOfPosts = await getUserPosts();
        const dataOfComments = await getUserComments();
        setMyPosts(dataOfPosts);
        setMyComments(dataOfComments);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ContainerTheme direction="column" justifyContent="space-between">
      <InformationContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Box sx={{ mb: 4 }}>
            <Header />
          </Box>
          <Box sx={{ mb: 4 }}>
            <NavTabs myPosts={myPosts} myComments={myComments} />
          </Box>
        </Card>
      </InformationContainer>
    </ContainerTheme>
  );
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '1440px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const InformationContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function Header() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        작성한 글/댓글
      </Typography>
    </Box>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function NavTabs({ myPosts, myComments }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const totalItems = useMemo(
    () => (value === 0 ? myPosts.length : myComments.length),
    [value, myPosts, myComments],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="글" {...a11yProps(0)} />
          <Tab label="댓글" {...a11yProps(1)} />
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <Typography>총 {totalItems}건</Typography>
          </Box>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ContentsTable myPosts={myPosts} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ContentsTable myPosts={myComments} />
      </CustomTabPanel>
    </Box>
  );
}

function ContentsTable({ myPosts }) {
  const navigate = useNavigate();

  const columns = [
    { id: 'no', label: 'NO' },
    { id: 'board', label: '게시판' },
    { id: 'title', label: '제목' },
    { id: 'date', label: '작성일' },
  ];

  const rows = myPosts.map((myPost, index) => {
    const formattedDate = new Date(myPost.createdAt).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return {
      no: index + 1,
      id: myPost.postId,
      board: myPost.categoryName,
      title: myPost.title,
      date: formattedDate,
    };
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, border: '1px solid gray', mt: 1 }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    borderBottom: '1px solid gray',
                  }}
                  sx={{ height: '10px', padding: '7px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'title') {
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            sx={{
                              height: '10px',
                              padding: '7px',
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              navigate(`/community/postDetail/${row.id}`)
                            }
                          >
                            {value}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align="center"
                          sx={{ height: '10px', padding: '7px' }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center', mt: '16px' }}
        direction="row"
      >
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)} // 페이지 개수를 계산
            page={page} // 현재 페이지
            onChange={handleChangePage} // 페이지 변경 함수
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default MyPageActivity;
