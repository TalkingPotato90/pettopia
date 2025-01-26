import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ColorModeSelect from '../theme/ColorModeSelect';
import { SitemarkIcon } from '../pages/CustomIcons';

const pages = ['홈', '커뮤니티'];

function TopNavBar({ isLoggedIn, userName, profileImgUrl, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate(location.pathname); // 로그아웃 후 현재 페이지로 리디렉션
  };

  const handleLoginClick = () => {
    // 이전 페이지 URL을 쿼리 파라미터로 첨부
    const currentUrl = window.location.href;
    window.location.href = `http://localhost:8080/home/login?prevPage=${encodeURIComponent(currentUrl)}`;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#808080' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home">
            <SitemarkIcon style={{ width: '24px', height: '24px' }} />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              mr: '20px',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={`/${page === '홈' ? 'home' : 'community/freeboard'}`}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleAvatarClick}
                  size="large"
                  edge="start"
                  sx={{
                    p: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    ml: 2,
                  }}
                >
                  {profileImgUrl ? (
                    <img
                      src={`http://localhost:8080/profileImages/${profileImgUrl}`}
                      alt="profileImg"
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <AccountCircle sx={{ fontSize: 35 }} />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleAvatarClose}
                >
                  <MenuItem onClick={() => handleMenuClick('/mypage/main')}>
                    정보 수정
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick('/mypage/activity')}>
                    작성한 글/댓글
                  </MenuItem>
                </Menu>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: 'white', ml: 1, mr: 2 }}
                >
                  {userName} 님
                </Typography>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2, mr: 2 }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLoginClick} // 로그인 버튼 클릭 시 로그인 페이지로 이동
                variant="contained"
                color="primary"
                sx={{ ml: 2, mr: 2 }}
              >
                로그인
              </Button>
            )}
          </Box>
          <ColorModeSelect sx={{ mr: 2, display: 'flex' }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNavBar;
