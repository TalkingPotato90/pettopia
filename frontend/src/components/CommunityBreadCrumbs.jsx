import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function CommunityBreadCrumbs() {
  const navigate = useNavigate();

  const handleClick = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={(e) => handleClick(e, '/')}
    >
      홈
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/community/freeboard"
      onClick={(e) => handleClick(e, '/community/freeboard')}
    >
      커뮤니티
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      자유게시판
    </Typography>,
  ];

  return (
    <Breadcrumbs
      sx={{ display: 'flex', justifyContent: 'flex-start', pt: 2, pl: 10 }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default CommunityBreadCrumbs;
