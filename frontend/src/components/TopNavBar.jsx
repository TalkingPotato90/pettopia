import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import defaultAvatar from '../assets/defaultAvatar.png';
import ColorModeSelect from '../theme/ColorModeSelect';
import { SitemarkIcon } from '../pages/CustomIcons';

const pages = ['홈', '커뮤니티'];
const userName = '핫도그';

function TopNavBar({ isLoggedIn, onLogout }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleAvatarClick = () => {
    navigate('/mypage/main');
  };

  const handleLogout = () => {
    onLogout();
    navigate(location.pathname);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#808080' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home">
            <SitemarkIcon style={{ width: '24px', height: '24px' }} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={`/${page === '홈' ? '' : 'community/freeboard'}`}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="myPage">
                  <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                    <Avatar src={defaultAvatar} />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: 'white', ml: 2, mr: 2 }}
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
                onClick={() => navigate('/home/login')}
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
