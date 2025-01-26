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

function MyPageMain({ updateProfile }) {
  const [formData, setFormData] = useState({
    hasPet: false,
    nickname: '',
    petName: '',
    introduction: '',
    profileImgUrl: '',
    profileImgBase64: '',
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

  const handleProfileImgChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 이름을 UUID로 변경 (예: file.name 대신 UUID 사용)
    const fileName = `${Date.now()}_${file.name}`;

    // 파일을 Base64로 변환
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileBase64 = reader.result.split(',')[1]; // Base64 문자열만 추출

      // formData 업데이트
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImgUrl: fileName,
        profileImgBase64: fileBase64,
      }));
    };
    reader.readAsDataURL(file); // 파일을 Base64로 변환
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
          profileImgUrl: data.profileImgUrl ?? '',
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
    if (!formData.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (formData.hasPet) {
      if (
        !formData.petName ||
        !formData.petBirthday ||
        !formData.petGender ||
        formData.neutering === undefined
      ) {
        alert('반려동물 이름, 생년월일, 성별, 중성화 여부를 입력해주세요.');
        return;
      }
    }

    try {
      updateUserAndPetInfo(formData);
      updateProfile(formData.nickname, formData.profileImgUrl);
    } catch (error) {
      console.error('사용자, 반려동물 정보 업데이트 에러 : ' + error);
    }
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
          {introduce(
            formData.introduction,
            handleInputChange,
            formData.profileImgUrl,
            handleProfileImgChange,
          )}
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
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '0 auto',
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

function introduce(
  introduction,
  onIntroductionChange,
  profileImgUrl,
  handleProfileImgChange,
) {
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
      <Box sx={{ flex: 1 }}>
        {inputFileUpload(profileImgUrl, handleProfileImgChange)}
      </Box>
    </Box>
  );
}

function inputFileUpload(profileImgUrl, handleProfileImgChange) {
  const fileName = profileImgUrl.replace('profileImages/', '');

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
        value={profileImgUrl ? `파일명: ${fileName}` : '사진을 업로드하세요.'}
        disabled
      />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <input type="file" hidden onChange={handleProfileImgChange} multiple />
      </Button>
    </Box>
  );
}

export default MyPageMain;
