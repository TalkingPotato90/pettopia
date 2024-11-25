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
    <Container>
      {header()}
      {editCategory(defaultAvatar, '회원정보', '회원 정보 수정')}
      {inputDefaultInformation('닉네임', '이명화', '1998-06-03', false)}

      <FormControlLabel
        control={
          <Checkbox checked={hasPet} onChange={handlePetCheckboxChange} />
        }
        label="반려동물 여부"
      />

      {hasPet && (
        <>
          {editCategory(defaultAvatar, '반려동물', '반려동물 프로필 등록')}
          {inputDefaultInformation('이름', '돌멩이', '1998-05-13', true)}
        </>
      )}

      {introduce()}
      <Button variant="contained">수정</Button>
    </Container>
  );
}

function header() {
  return (
    <Box component="section">
      <h2>마이 페이지</h2>
    </Box>
  );
}

function editCategory(image, alt, title) {
  return (
    <Stack direction="row" spacing={1}>
      <Avatar alt={alt} src={image} sx={{ width: 24, height: 24 }} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

function inputDefaultInformation(nameLabel, name, birthday, isAnimal) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label={nameLabel}
          defaultValue={name}
        />
        <TextField
          disabled={!isAnimal}
          id={isAnimal ? 'outlined-helperText' : 'outlined-disabled'}
          label="생년월일"
          defaultValue={birthday}
        />
        <GenderRadioGroupComponent />
        {isAnimal && <NeutralizationRadioGroupComponent />}
      </div>
    </Box>
  );
}

function GenderRadioGroupComponent() {
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">성별</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
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
    <FormControl>
      <FormLabel id="neutralization-radio-buttons-group">중성화 여부</FormLabel>
      <RadioGroup
        row
        aria-labelledby="neutralization-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="예" />
        <FormControlLabel value="no" control={<Radio />} label="아니오" />
      </RadioGroup>
    </FormControl>
  );
}

function introduce() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="소개 및 특이사항"
          multiline
          rows={4}
          defaultValue="돌멩이는 가만히 있는 것을 좋아합니다."
        />
        {InputFileUpload()}
      </div>
    </Box>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function InputFileUpload() {
  return (
    <>
      <label>프로필 사진 등록</label>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => event.target.files}
          multiple
        />
      </Button>
    </>
  );
}

export default MyPageMain;
