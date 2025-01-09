// 로그인 상태 확인 API 호출
export const checkSocialLoginStatus = async () => {
  try {
    const response = await fetch('/auth/me', {
      method: 'GET',
      credentials: 'include', // 세션 기반 인증을 위해 쿠키를 포함한 요청
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 데이터 검증
    if (
      data &&
      typeof data.isLoggedIn === 'boolean' &&
      typeof data.userName === 'string'
    ) {
      return {
        isLoggedIn: data.isLoggedIn,
        userName: data.userName,
      };
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    return {
      isLoggedIn: false,
      userName: '',
    };
  }
};

// 로그아웃 API 호출
export const logoutSocialLogin = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
      credentials: 'include', // 세션 기반 인증을 위해 쿠키를 포함한 요청
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; // 로그아웃 성공
  } catch (error) {
    console.error('Error during logout:', error.message);
    return false; // 로그아웃 실패
  }
};
