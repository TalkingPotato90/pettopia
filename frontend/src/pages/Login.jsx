import { Box, Button, Stack, styled, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { GoogleIcon, KakaoIcon, NaverIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../theme/ColorModeSelect';

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

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Login() {
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Card variant="outlined">
        <SitemarkIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          소셜 로그인
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('카카오 로그인')}
            startIcon={<KakaoIcon />}
          >
            카카오 계정으로 로그인 하기
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('네이버 로그인')}
            startIcon={<NaverIcon />}
          >
            네이버 계정으로 로그인하기
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('구글 로그인')}
            startIcon={<GoogleIcon />}
          >
            구글 계정으로 로그인하기
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
