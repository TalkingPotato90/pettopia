import { useState } from 'react';
import {
  Breadcrumbs,
  Typography,
  Box,
  Link,
  Stack,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import defaultAvatar from '../assets/defaultAvatar.png';

function TopBreadcrumbs() {
  const handleClick = (event) => {
    event.preventDefault();
    alert('breadcrumbs 클릭');
  };

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      커뮤니티
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      자유게시판
    </Typography>,
  ];

  return (
    <Breadcrumbs
      sx={{ display: 'flex', justifyContent: 'flex-start', pt: 5, pl: 10 }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

function Title() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 10 }}>
      <Typography variant="h4">자유게시판</Typography>
    </Box>
  );
}

function SortTable({ onSortChange }) {
  const [sort, setSort] = useState('');

  const handleChange = (event) => {
    const newSort = event.target.value;
    setSort(newSort);
    onSortChange(newSort); // 부모 컴포넌트에 값 전달
  };

  return (
    <FormControl sx={{ minWidth: 120, height: '40px' }} size="small">
      <InputLabel id="demo-select-small-label">정렬</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sort}
        label="정렬"
        onChange={handleChange}
      >
        <MenuItem disabled value="">
          <em>정렬</em>
        </MenuItem>
        <MenuItem value="byDate">작성일순</MenuItem>
        <MenuItem value="byView">조회순</MenuItem>
        <MenuItem value="byRecommend">추천순</MenuItem>
      </Select>
    </FormControl>
  );
}

function SearchForm() {
  return (
    <FormControl
      sx={{ width: { xs: '100%', md: '25ch' }, height: '40px' }}
      variant="outlined"
    >
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

function SearchButton() {
  const handleClick = (event) => {
    event.preventDefault();
    alert('검색 클릭');
  };

  return (
    <Button
      sx={{ height: '40px' }}
      variant="contained"
      color="primary"
      startIcon={<SearchRoundedIcon />}
      onClick={handleClick}
    >
      검색
    </Button>
  );
}

function TableContents({ sort }) {
  const columns = [
    { id: 'number', label: '글번호', minWidth: 25 },
    { id: 'title', label: '제목', minWidth: 200 },
    { id: 'author', label: '작성자', minWidth: 80 },
    {
      id: 'date',
      label: '작성일',
      minWidth: 80,
      format: (value) => value.toISOString,
    },
    { id: 'view', label: '조회수', minWidth: 35 },
    { id: 'recommend', label: '추천수', minWidth: 35 },
  ];

  const createData = (number, title, avatar, author, date, view, recommend) => {
    return { number, title, avatar, author, date, view, recommend };
  };

  const rows = [
    createData(
      1,
      '강아지 귀여워',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      10,
      10,
    ),
    createData(
      2,
      '고양이도 귀여움',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      9,
      9,
    ),
    createData(
      3,
      '강아지 귀여워',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      8,
      8,
    ),
    createData(
      4,
      '고양이도 귀여움',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      6,
      6,
    ),
    createData(
      5,
      '강아지 귀여워',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      7,
      7,
    ),
    createData(
      6,
      '고양이도 귀여움',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      7,
      '강아지 귀여워',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      8,
      '고양이도 귀여움',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      9,
      '강아지 귀여워',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      10,
      '고양이도 귀여움',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      11,
      '강아지 귀여워',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      12,
      '고양이도 귀여움',
      null,
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
  ];

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // sort 기준에 따라 정렬
  const sortedRows = [...rows].sort((a, b) => {
    switch (sort) {
      case 'byDate':
        return new Date(b.date) - new Date(a.date); // 작성일 기준 내림차순
      case 'byView':
        return b.view - a.view; // 조회수 기준 내림차순
      case 'byRecommend':
        return b.recommend - a.recommend; // 추천수 기준 내림차순
      default:
        return 0;
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        pl: 10,
        pr: 10,
        flexDirection: 'column',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, border: '1px solid gray' }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5',
                  }}
                  sx={{ height: '10px', padding: '7px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'author') {
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            sx={{ height: '10px', padding: '7px' }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <img
                                src={row.avatar || defaultAvatar}
                                alt="avatar"
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  marginRight: '8px',
                                }}
                              />
                              {value}
                            </Box>
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
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
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

        <WriteButton />
      </Stack>
    </Box>
  );
}

function WriteButton() {
  const handleClick = (event) => {
    event.preventDefault();
    alert('글작성 클릭');
  };

  return (
    <Button
      sx={{ height: '40px' }}
      variant="contained"
      color="primary"
      onClick={handleClick}
    >
      글 작성
    </Button>
  );
}

function FreeBoard() {
  const [sort, setSort] = useState(''); // 정렬 상태 관리

  // 정렬 기준 변경 시 상태 업데이트
  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <Stack spacing={2}>
      <TopBreadcrumbs />
      <Title />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pr: 10 }}>
        <SortTable onSortChange={handleSortChange} />
        <SearchForm />
        <SearchButton />
      </Box>
      <TableContents sort={sort} />
    </Stack>
  );
}

export default FreeBoard;