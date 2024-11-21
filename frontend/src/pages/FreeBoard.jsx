import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function SortForm() {
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
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
        <MenuItem value="byView">조회순</MenuItem>
        <MenuItem value="byDate">날짜순</MenuItem>
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

function TableContents() {
  const createData = (number, title, author, date, view, recommend) => {
    return { number, title, author, date, view, recommend };
  };

  const rows = [
    createData(
      1,
      '강아지 귀여워',
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
    createData(
      2,
      '고양이도 귀여움',
      '핫도그',
      new Date().toISOString().split('T')[0],
      15,
      100,
    ),
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pl: 10, pr: 10 }}>
      <TableContainer component={Paper} style={styles.table}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">글번호</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center">조회수</TableCell>
              <TableCell align="center">추천수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.number}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.number}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.author}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.view}</TableCell>
                <TableCell align="center">{row.recommend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function FreeBoard() {
  return (
    <Stack spacing={2}>
      <TopBreadcrumbs />
      <Title />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pr: 10 }}>
        <SortForm />
        <SearchForm />
        <SearchButton />
      </Box>
      <TableContents />
    </Stack>
  );
}

const styles = {
  table: {
    margin: '20px auto',
    display: 'flex',
  },
};

export default FreeBoard;
