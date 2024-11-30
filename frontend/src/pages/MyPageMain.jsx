import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import ContainerTheme from '../theme/ContainerTheme';

function MyPageMain() {
  const [hasPet, setHasPet] = useState(false);

  const handlePetCheckboxChange = (event) => {
    setHasPet(event.target.checked);
  };

  return (
    <ContainerTheme direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Box sx={{ mb: 4 }}>{header()}</Box>
        {editCategory('human', '회원정보', '회원 정보 수정')}
        <Box sx={{ mb: 4 }}>
          {inputDefaultInformation('닉네임', '이명화', '1998-06-03', false)}
        </Box>

        <Divider />

        <FormControlLabel
          control={
            <Checkbox checked={hasPet} onChange={handlePetCheckboxChange} />
          }
          label="반려동물 여부"
          sx={{ mb: 4 }}
        />

        {hasPet && (
          <Box sx={{ mb: 4 }}>
            {editCategory('pet', '반려동물', '반려동물 프로필 등록')}
            {inputDefaultInformation('이름', '돌멩이', '1998-05-13', true)}
          </Box>
        )}

        <Box sx={{ mb: 4 }}>{introduce()}</Box>
        <Button variant="contained">수정</Button>
      </Card>
    </ContainerTheme>
  );
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '1440px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

function header() {
  return (
    <Box component="section">
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        마이 페이지
      </Typography>
    </Box>
  );
}

function editCategory(image, alt, title) {
  const IconComponent = image === 'human' ? AccountCircleIcon : PetsIcon;

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <IconComponent alt={alt} />
      <Typography variant="subtitle1">{title}</Typography>
    </Stack>
  );
}

function inputDefaultInformation(nameLabel, name, birthday, isAnimal) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <TextField
          required
          id="outlined-required"
          label={nameLabel}
          defaultValue={name}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <TextField
          disabled={!isAnimal}
          id={isAnimal ? 'outlined-helperText' : 'outlined-disabled'}
          label="생년월일"
          defaultValue={birthday}
          fullWidth
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <GenderRadioGroupComponent />
        {isAnimal && <NeutralizationRadioGroupComponent />}
      </Box>
    </Box>
  );
}

function GenderRadioGroupComponent() {
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel>성별</FormLabel>
      <RadioGroup
        row
        name="gender"
        value={value}
        onChange={handleChange}
        sx={{ gap: 2 }}
      >
        <FormControlLabel value="male" control={<Radio />} label="남" />
        <FormControlLabel value="female" control={<Radio />} label="여" />
      </RadioGroup>
    </FormControl>
  );
}

function NeutralizationRadioGroupComponent() {
  const [value, setValue] = useState('yes');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel>중성화 여부</FormLabel>
      <RadioGroup
        row
        name="neutralization"
        value={value}
        onChange={handleChange}
        sx={{ gap: 2 }}
      >
        <FormControlLabel value="yes" control={<Radio />} label="예" />
        <FormControlLabel value="no" control={<Radio />} label="아니오" />
      </RadioGroup>
    </FormControl>
  );
}

function introduce() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 2 }}>
        <TextField
          id="outlined-multiline-static"
          label="한줄소개"
          fullWidth
          defaultValue="돌멩이는 가만히 있는 것을 좋아합니다."
        />
      </Box>
      <Box sx={{ flex: 1 }}>{InputFileUpload()}</Box>
    </Box>
  );
}

function InputFileUpload() {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <TextField
        id="outlined-read-only-input"
        label="프로필 사진 등록"
        defaultValue="사진을 업로드하세요."
        disabled
      />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <input
          type="file"
          hidden
          onChange={(event) => event.target.files}
          multiple
        />
      </Button>
    </Box>
  );
}

export default MyPageMain;
