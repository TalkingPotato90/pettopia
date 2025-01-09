import { useState, useEffect } from 'react';
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
import { fetchUser } from '../api/user';

function MyPageMain() {
  const [hasPet, setHasPet] = useState(false);
  const [name, setName] = useState('');
  const [petName, setPetName] = useState('');
  const [petBirthday, setPetBirthday] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [info, setInfo] = useState({});

  const handlePetCheckboxChange = (event) => {
    setHasPet(event.target.checked);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePetNameChange = (event) => {
    setPetName(event.target.value);
  };

  const handlePetBirthdayChange = (event) => {
    setPetBirthday(event.target.value);
  };

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await fetchUser();
        setHasPet(data.hasPet);
        setName(data.nickname);
        setPetBirthday(data.petBirthday);
        setPetName(data.petName);
        setIntroduction(data.introduction);
        setInfo(data);
      } catch (e) {
        alert(e);
      }
    };
    loadInfo();
  }, []);

  return (
    <ContainerTheme direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Box sx={{ mb: 4 }}>{header()}</Box>
        {editCategory('human', '회원정보', '회원 정보 수정')}
        <Box sx={{ mb: 4 }}>
          {inputDefaultInformation(
            '닉네임',
            name,
            false,
            null,
            null,
            null,
            handleNameChange,
          )}
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
            {inputDefaultInformation(
              '이름',
              petName,
              petBirthday,
              true,
              info.petGender,
              info.neutering,
              handlePetNameChange,
              handlePetBirthdayChange,
            )}
          </Box>
        )}

        <Box sx={{ mb: 4 }}>
          {introduce(introduction, handleIntroductionChange)}
        </Box>
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

function inputDefaultInformation(
  nameLabel,
  name,
  birthday,
  isAnimal,
  gender,
  neutering,
  onNameChange,
  onBirthdayChange,
) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <TextField
          required
          id="outlined-required"
          label={nameLabel}
          value={name}
          onChange={onNameChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      {isAnimal && (
        <Box sx={{ flex: 1 }}>
          <TextField
            id={isAnimal ? 'outlined-helperText' : 'outlined-disabled'}
            label="생년월일"
            value={birthday}
            onChange={onBirthdayChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      )}
      {isAnimal && (
        <Box sx={{ flex: 1 }}>
          <GenderRadioGroupComponent gender={gender} />
          {isAnimal && (
            <NeutralizationRadioGroupComponent neutering={neutering} />
          )}
        </Box>
      )}
    </Box>
  );
}

function GenderRadioGroupComponent({ gender }) {
  const [value, setValue] = useState(gender);

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
        <FormControlLabel value="M" control={<Radio />} label="남" />
        <FormControlLabel value="F" control={<Radio />} label="여" />
      </RadioGroup>
    </FormControl>
  );
}

function NeutralizationRadioGroupComponent({ neutering }) {
  const [value, setValue] = useState(neutering ? neutering.toString() : '');

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
        <FormControlLabel value="true" control={<Radio />} label="예" />
        <FormControlLabel value="false" control={<Radio />} label="아니오" />
      </RadioGroup>
    </FormControl>
  );
}

function introduce(introduction, onIntroductionChange) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 2 }}>
        <TextField
          id="outlined-multiline-static"
          label="한줄소개"
          fullWidth
          value={introduction}
          onChange={onIntroductionChange}
          InputLabelProps={{ shrink: true }}
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
