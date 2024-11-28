import { useState } from 'react';
import { Stack, Typography, Box, TextField, Button } from '@mui/material';
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

  return (
    <>
      {buttons.map((buttonText, index) => {
        return (
          <Button
            key={{ index }}
            sx={{
              height: '40px',
              marginRight: index === 0 ? '10px' : '0',
            }}
            variant="contained"
            color={buttonText === '등록' ? 'primary' : 'error'}
            onClick={() => alert(`${buttonText} 클릭`)}
          >
            {buttonText}
          </Button>
        );
      })}
    </>
  );
}

export default PostWrite;