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
import { getUserAndPetInfo, updateUserAndPetInfo } from '../api/user';
import DatePickerValue from '../components/DatePickerValue';

function MyPageMain() {
  const [formData, setFormData] = useState({
    hasPet: false,
    nickname: '',
    petName: '',
    introduction: '',
    petBirthday: '',
    petGender: '',
    neutering: '',
  });

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          hasPet: true,
          petName: prevData.petName || '',
          petGender: prevData.petGender || '',
          petBirthday: prevData.petBirthday || '',
          neutering: prevData.neutering || '',
        };
      } else {
        return {
          ...prevData,
          hasPet: false,
          petName: '',
          petGender: '',
          petBirthday: '',
          neutering: '',
        };
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePetBirthdayChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      petBirthday: newDate,
    }));
  };

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await getUserAndPetInfo();
        setFormData({
          hasPet: data.hasPet ?? '',
          nickname: data.nickname ?? '',
          petName: data.hasPet ? data.petName : '',
          introduction: data.introduction ?? '',
          petBirthday: data.hasPet ? data.petBirthday : '',
          petGender: data.hasPet ? data.petGender : '',
          neutering: data.hasPet ? data.neutering : '',
        });
      } catch (e) {
        alert(e);
      }
    };
    loadInfo();
  }, []);

  const handleSubmit = () => {
    updateUserAndPetInfo(formData);
  };

  return (
    <ContainerTheme direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Box sx={{ mb: 4 }}>{header()}</Box>
        {editCategory('human', '회원정보', '회원 정보 수정')}
        <Box sx={{ mb: 4 }}>
          {inputDefaultInformation(
            '닉네임',
            formData.nickname,
            false,
            null,
            null,
            null,
            handleInputChange,
          )}
        </Box>

        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.hasPet}
              onChange={handleCheckboxChange}
            />
          }
          label="반려동물 여부"
          sx={{ mb: 4 }}
        />

        {formData.hasPet && (
          <Box sx={{ mb: 4 }}>
            {editCategory('pet', '반려동물', '반려동물 프로필 등록')}
            {inputDefaultInformation(
              '이름',
              formData.petName,
              formData.petBirthday,
              true,
              formData.petGender,
              formData.neutering,
              handleInputChange,
              handlePetBirthdayChange,
            )}
          </Box>
        )}

        <Box sx={{ mb: 4 }}>
          {introduce(formData.introduction, handleInputChange)}
        </Box>
        <Button variant="contained" onClick={handleSubmit}>
          수정
        </Button>
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
  handleInputChange,
  handlePetBirthdayChange,
) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 1, pt: 1 }}>
        <TextField
          required
          id="outlined-required"
          label={nameLabel}
          name={isAnimal ? 'petName' : 'nickname'}
          value={name}
          onChange={handleInputChange}
          fullWidth
        />
      </Box>
      {isAnimal && (
        <Box sx={{ flex: 1 }}>
          <DatePickerValue
            name="petBirthday"
            birthday={birthday}
            label="생년월일"
            onChange={handlePetBirthdayChange}
          />
        </Box>
      )}
      {isAnimal && (
        <Box sx={{ flex: 1 }}>
          <GenderRadioGroupComponent
            gender={gender}
            handleChange={handleInputChange}
          />
          {isAnimal && (
            <NeutralizationRadioGroupComponent
              neutering={neutering}
              handleChange={handleInputChange}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

function GenderRadioGroupComponent({ gender, handleChange }) {
  return (
    <FormControl component="fieldset">
      <FormLabel>성별</FormLabel>
      <RadioGroup
        row
        name="petGender"
        value={gender}
        onChange={handleChange}
        sx={{ gap: 2 }}
      >
        <FormControlLabel value="M" control={<Radio />} label="남" />
        <FormControlLabel value="F" control={<Radio />} label="여" />
      </RadioGroup>
    </FormControl>
  );
}

function NeutralizationRadioGroupComponent({ neutering, handleChange }) {
  return (
    <FormControl component="fieldset">
      <FormLabel>중성화 여부</FormLabel>
      <RadioGroup
        row
        name="neutering"
        value={neutering}
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
          name="introduction"
          fullWidth
          value={introduction}
          onChange={onIntroductionChange}
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
