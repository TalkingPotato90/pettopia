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

function CommunityTable({ page, rowsPerPage, sortedRows, columns, sx }) {
  const navigate = useNavigate();

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
            .map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.length > 0
                    ? columns.map((column) => {
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
                      })
                    : Object.keys(row).map((key) => {
                        const value = row[key];
                        if (key === 'id') {
                          return null;
                        }
                        if (key === 'title') {
                          return (
                            <TableCell
                              key={key}
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
                        if (key === 'view' || key === 'recommend') {
                          return (
                            <TableCell
                              key={key}
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
                                <VisibilityIcon
                                  fontSize="small"
                                  sx={{ mr: 1 }}
                                />
                                {row[key]}
                              </Box>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            key={key}
                            align="center"
                            sx={{ height: '10px', padding: '7px' }}
                          >
                            {row[key]}
                          </TableCell>
                        );
                      })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommunityTable;
