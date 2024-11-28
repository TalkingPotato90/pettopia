import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ReactQuillEditor from '../components/ReactQuillEditor';
import CommunityBreadCrumbs from '../components/CommunityBreadCrumbs';
import CommunityTitle from '../components/CommunityTitle';

function PostWrite() {
  const [content, setContent] = useState(''); // 에디터 내용 관리

  const handleChange = (value) => {
    setContent(value); // 에디터에서 변경된 값 반영
  };

  return (
    <Stack spacing={1}>
      <CommunityBreadCrumbs />
      <CommunityTitle />
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-start', pt: 2, pl: 10 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          글 제목
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          pl: 10,
          pr: 10,
          '& > :not(style)': { width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="post-title"
          variant="outlined"
          size="small"
          placeholder="글 제목을 작성해주세요."
          autoFocus
        />
      </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'flex-start', pt: 2, pl: 10 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          글 내용
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-start', pl: 10, pr: 10 }}
      >
        <ReactQuillEditor
          style={{ width: '100%', height: '250px' }} // 원하는 스타일 적용
          value={content} // 에디터에 바인딩된 값
          onChange={handleChange} // 값 변경 핸들러
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 7 }}>
        <Buttons />
      </Box>
    </Stack>
  );
}

function Buttons() {
  const buttons = ['등록', '취소'];
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmCancel = () => {
    setIsModalOpen(false);
    navigate('/community/freeboard');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegister = () => {
    alert('등록');
  };

  const handleCancel = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {buttons.map((buttonText, index) => {
        return (
          <Button
            key={index}
            sx={{
              height: '40px',
              marginRight: index === 0 ? '10px' : '0',
            }}
            variant="contained"
            color={buttonText === '등록' ? 'primary' : 'error'}
            onClick={buttonText === '등록' ? handleRegister : handleCancel}
          >
            {buttonText}
          </Button>
        );
      })}

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          작성한 내용이 모두 사라집니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            취소하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={confirmCancel}
            sx={{ '&:hover': { color: 'primary.main' } }}
          >
            확인
          </Button>
          <Button
            onClick={closeModal}
            sx={{ '&:hover': { color: 'error.main' } }}
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PostWrite;
