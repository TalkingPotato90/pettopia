import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CommunityBreadCrumbs from '../components/CommunityBreadCrumbs';
import CommunityTitle from '../components/CommunityTitle';
import CommunityTable from '../components/CommunityTable';
import ContainerTheme from '../theme/ContainerTheme';

function FreeBoard({ posts, isLoggedIn }) {
  const columns = [
    { id: 'id', label: '글번호', minWidth: 25 },
    { id: 'title', label: '제목', minWidth: 200 },
    { id: 'author', label: '작성자', minWidth: 80 },
    {
      id: 'date',
      label: '작성일',
      minWidth: 80,
      format: (value) => value.toISOString(),
    },
    { id: 'view', label: '조회수', minWidth: 35 },
    { id: 'recommend', label: '추천수', minWidth: 35 },
  ];

  const rows = posts.map((post) => ({
    id: post.postId,
    title: post.title,
    avatar: post.avatar || null,
    author: post.author,
    date: new Date(post.createdAt).toLocaleDateString(),
    view: post.view,
    recommend: post.recommend,
  }));

  const [sort, setSort] = useState(''); // 정렬 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [inputTerm, setInputTerm] = useState(''); // 입력된 검색어 상태 관리
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
    <ContainerTheme direction="column" justifyContent="space-between">
      <Stack spacing={2}>
        <CommunityBreadCrumbs />
        <CommunityTitle />
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pr: 10 }}
        >
          <SortTable onSortChange={handleSortChange} />
          <SearchForm
            value={inputTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
          <SearchButton onSearch={handleSearch} />
        </Box>

        <Box sx={{ pl: 10, pr: 10 }}>
          <CommunityTable
            page={page}
            rowsPerPage={rowsPerPage}
            sortedRows={sortedRows}
            columns={columns}
          />
        </Box>

        <Box sx={{ pr: 10, pb: 3, flexDirection: 'column' }}>
          <PaginationAndButton
            page={page}
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            onChange={handleChangePage}
            isLoggedIn={isLoggedIn}
          />
        </Box>
      </Stack>
    </ContainerTheme>
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

function PaginationAndButton({ page, count, onChange, isLoggedIn }) {
  return (
    <Stack
      spacing={2}
      sx={{ display: 'flex', justifyContent: 'center' }}
      direction="row"
    >
      <TablePagination page={page} count={count} onChange={onChange} />

      {isLoggedIn && <WriteButton />}
    </Stack>
  );
}

function TablePagination({ page, count, onChange }) {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={count}
        page={page} // 현재 페이지
        onChange={onChange} // 페이지 변경 함수
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
}

function WriteButton() {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ height: '40px' }}
      variant="contained"
      color="primary"
      onClick={() => navigate('/community/postwrite')}
    >
      글 작성
    </Button>
  );
}

export default FreeBoard;
