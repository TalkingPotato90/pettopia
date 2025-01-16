const baseURL = '/freeboard';

// 전체 게시글 목록 가져오기
export const fetchPost = async () => {
  try {
    const response = await fetch(`${baseURL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('전체 게시글 데이터 가져오기 오류:', error.message);
    throw error;
  }
};

// 특정 게시글 가져오기
export const fetchPostById = async (postId) => {
  try {
    const response = await fetch(`${baseURL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`게시글 ID ${postId} 가져오기 오류:`, error.message);
    throw error;
  }
};
