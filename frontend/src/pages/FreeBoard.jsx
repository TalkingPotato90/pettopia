import { useState } from 'react';
import {
  Typography,
  Box,
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
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CommunityBreadCrumbs from '../components/CommunityBreadCrumbs';
import defaultAvatar from '../assets/defaultAvatar.png';

function FreeBoard({ isLoggedIn }) {
  const [sort, setSort] = useState(''); // 정렬 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [inputTerm, setInputTerm] = useState(''); // 입력된 검색어 상태 관리

  // 정렬 기준 변경 시 상태 업데이트
  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  // 검색어 입력 시 상태 업데이트 (SearchButton 클릭 전까지는 searchTerm 변경 안 함)
  const handleSearchChange = (event) => {
    setInputTerm(event.target.value);
  };

  // 검색어를 업데이트하는 함수
  const handleSearch = () => {
    setSearchTerm(inputTerm);
  };

  return (
    <Stack spacing={2}>
      <CommunityBreadCrumbs />
      <Title />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pr: 10 }}>
        <SortTable onSortChange={handleSortChange} />
        <SearchForm
          value={inputTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        <SearchButton onSearch={handleSearch} />
      </Box>
      <TableContents
        sort={sort}
        searchTerm={searchTerm}
        isLoggedIn={isLoggedIn}
      />
    </Stack>
  );
}

function Title() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 10 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        자유게시판
      </Typography>
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

function SearchForm({ value, onSearchChange, onSearch }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(value); // Enter 키를 눌렀을 때 검색어로 필터링
    }
  };

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
        value={value}
        onChange={onSearchChange} // 검색어 입력 시 상태 업데이트
        onKeyPress={handleKeyPress} // Enter 키 처리
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

function SearchButton({ onSearch }) {
  const handleClick = (event) => {
    event.preventDefault();
    onSearch(); // 검색 버튼 클릭 시 검색어 상태로 필터링
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

function TableContents({ sort, searchTerm, isLoggedIn }) {
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
      '피카츄',
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
      '피카츄',
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
      '피카츄',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      7,
      '강아지 귀여워',
      null,
      '피카츄',
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

  const filteredRows = rows.filter((row) => {
    return row.title.includes(searchTerm) || row.author.includes(searchTerm); // 제목이나 작성자가 검색어를 포함하는 경우만 필터링
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // sort 기준에 따라 정렬
  const sortedRows = [...filteredRows].sort((a, b) => {
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
                            onClick={() => alert(row.title)}
                          >
                            {value}
                          </TableCell>
                        );
                      }
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
            count={Math.ceil(filteredRows.length / rowsPerPage)} // 페이지 개수를 계산
            page={page} // 현재 페이지
            onChange={handleChangePage} // 페이지 변경 함수
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Box>

        {isLoggedIn && <WriteButton />}
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

export default FreeBoard;
