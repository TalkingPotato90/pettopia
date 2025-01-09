import { Box, Button, Divider, styled } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { FullLogoIcon, GoogleIcon, KakaoIcon, NaverIcon } from './CustomIcons';
import ContainerTheme from '../theme/ContainerTheme';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function Login() {
  const handleLoginRedirect = (provider) => {
    // 단순히 OAuth 로그인 URL로 리디렉션
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <ContainerTheme direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <FullLogoIcon />
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleLoginRedirect('kakao')}
            startIcon={<KakaoIcon />}
          >
            카카오 계정으로 로그인 하기
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleLoginRedirect('naver')}
            startIcon={<NaverIcon />}
          >
            네이버 계정으로 로그인하기
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleLoginRedirect('google')}
            startIcon={<GoogleIcon />}
          >
            구글 계정으로 로그인하기
          </Button>
        </Box>
      </Card>
    </ContainerTheme>
  );
}
