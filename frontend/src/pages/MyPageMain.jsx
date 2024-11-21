import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import defaultAvatar from '../assets/defaultAvatar.png';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import React from 'react';

function MyPageMain() {
  return (
    <>
      {header()}
      {editCategory(defaultAvatar, '회원정보', '회원 정보 수정')}
      {inputDefaultInformation('닉네임', '이명화', '1998-06-03', false)}
      {editCategory(defaultAvatar, '반려동물', '반려동물 프로필 등록')}
      {inputDefaultInformation('이름', '돌멩이', '1998-05-13', true)}
      <Button variant="contained">수정</Button>
    </>
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
          disabled
          id="outlined-disabled"
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
  const [value, setValue] = React.useState('female');

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
  const [value, setValue] = React.useState('yes');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        중성화 여부
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
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

export default MyPageMain;
