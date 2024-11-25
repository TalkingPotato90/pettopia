import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Grid2,
  Divider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import defaultAvatar from '../assets/defaultAvatar.png';

function MyPageMain() {
  const [hasPet, setHasPet] = useState(false);

  const handlePetCheckboxChange = (event) => {
    setHasPet(event.target.checked);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>{header()}</Box>
      {editCategory(defaultAvatar, '회원정보', '회원 정보 수정')}
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
          {editCategory(defaultAvatar, '반려동물', '반려동물 프로필 등록')}
          {inputDefaultInformation('이름', '돌멩이', '1998-05-13', true)}
        </Box>
      )}

      <Box sx={{ mb: 4 }}>{introduce()}</Box>
      <Button variant="contained">수정</Button>
    </Container>
  );
}

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
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <Avatar alt={alt} src={image} sx={{ width: 24, height: 24 }} />
      <Typography variant="subtitle1">{title}</Typography>
    </Stack>
  );
}

function inputDefaultInformation(nameLabel, name, birthday, isAnimal) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={4}>
        <TextField
          required
          id="outlined-required"
          label={nameLabel}
          defaultValue={name}
          fullWidth
        />
      </Grid2>
      <Grid2 xs={4}>
        <TextField
          disabled={!isAnimal}
          id={isAnimal ? 'outlined-helperText' : 'outlined-disabled'}
          label="생년월일"
          defaultValue={birthday}
          fullWidth
        />
      </Grid2>
      <Grid2 xs={4}>
        <GenderRadioGroupComponent />
        {isAnimal && <NeutralizationRadioGroupComponent />}
      </Grid2>
    </Grid2>
  );
}

function GenderRadioGroupComponent() {
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl
      component="fieldset"
      sx={{
        mt: 0,
        position: 'relative',
        top: '-15px',
      }}
    >
      <FormLabel sx={{ mb: 1 }}>성별</FormLabel>
      <RadioGroup
        row
        name="gender"
        value={value}
        onChange={handleChange}
        sx={{
          gap: 2,
          position: 'relative',
          top: '-10px',
        }}
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
    <FormControl
      component="fieldset"
      sx={{
        mt: 0,
        position: 'relative',
        top: '-15px',
      }}
    >
      <FormLabel sx={{ mb: 1 }}>중성화 여부</FormLabel>
      <RadioGroup
        row
        name="neutralization"
        value={value}
        onChange={handleChange}
        sx={{
          gap: 2,
          position: 'relative',
          top: '-10px',
        }}
      >
        <FormControlLabel value="yes" control={<Radio />} label="예" />
        <FormControlLabel value="no" control={<Radio />} label="아니오" />
      </RadioGroup>
    </FormControl>
  );
}

function introduce() {
  return (
    <Grid2 container spacing={2} alignItems="flex-start">
      <Grid2 xs={8}>
        <TextField
          id="outlined-multiline-static"
          label="소개 및 특이사항"
          multiline
          rows={4}
          fullWidth
          defaultValue="돌멩이는 가만히 있는 것을 좋아합니다."
        />
      </Grid2>
      <Grid2 xs={4}>{InputFileUpload()}</Grid2>
    </Grid2>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

function InputFileUpload() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' },
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-read-only-input"
        label="프로필 사진 등록"
        defaultValue="사진을 업로드하세요."
        disabled
        sx={{
          '& .MuiOutlinedInput-root': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          whiteSpace: 'nowrap',
          textTransform: 'none',
          height: '36px',
        }}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => event.target.files}
          multiple
        />
      </Button>
    </Box>
  );
}

export default MyPageMain;
