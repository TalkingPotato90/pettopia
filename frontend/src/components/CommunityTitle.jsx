import { Typography, Box } from '@mui/material';

function CommunityTitle() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 10 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        자유게시판
      </Typography>
    </Box>
  );
}

export default CommunityTitle;
