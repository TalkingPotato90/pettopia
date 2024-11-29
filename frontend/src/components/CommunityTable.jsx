import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import defaultAvatar from '../assets/defaultAvatar.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RecommendIcon from '@mui/icons-material/Recommend';

function CommunityTable({ page, rowsPerPage, sortedRows, columns, sx }) {
  const navigate = useNavigate();

  // 공통 TableCell 렌더링 함수
  const renderTableCell = (value, column, row) => {
    const commonCellProps = {
      align: 'center',
      sx: { height: '10px', padding: '7px' },
    };

    // title 컬럼 클릭 시 상세 페이지로 이동
    if (column.id === 'title') {
      return (
        <TableCell
          {...commonCellProps}
          sx={{ ...commonCellProps.sx, cursor: 'pointer' }}
          onClick={() => navigate(`/community/postDetail/${row.id}`)}
        >
          {value}
        </TableCell>
      );
    }

    // author 컬럼에 이미지와 이름을 함께 표시
    if (column.id === 'author') {
      return (
        <TableCell {...commonCellProps}>
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

    // view, recommend 컬럼에 아이콘 추가
    if (column.id === 'view' || column.id === 'recommend') {
      return (
        <TableCell {...commonCellProps}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {column.id === 'view' && (
              <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            {column.id === 'recommend' && (
              <RecommendIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            {value}
          </Box>
        </TableCell>
      );
    }

    // 숫자 포맷이 있을 때 처리
    return (
      <TableCell {...commonCellProps}>
        {column.format && typeof value === 'number'
          ? column.format(value)
          : value}
      </TableCell>
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 440, border: '1px solid gray', ...sx }}
    >
      <Table stickyHeader aria-label="sticky table">
        {columns.length > 0 && (
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
                    minWidth: column.minWidth,
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
        )}
        <TableBody>
          {sortedRows
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.length > 0
                  ? columns.map((column) => {
                      const value = row[column.id];
                      return renderTableCell(value, column, row);
                    })
                  : Object.keys(row).map((key) => {
                      if (key === 'id') return null; // id는 렌더링 하지 않음
                      const value = row[key];
                      return renderTableCell(value, { id: key }, row);
                    })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommunityTable;
