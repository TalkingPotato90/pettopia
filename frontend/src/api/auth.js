// src/api/auth.js

// 로그인 상태 확인 API 호출
export const checkSocialLoginStatus = async () => {
  try {
    const response = await fetch('/api/check-login', {
      method: 'GET',
      credentials: 'include', // 세션 기반 인증을 위해 쿠키를 포함한 요청
    });

    if (!response.ok) {
      throw new Error('Failed to fetch login status');
    }

    const data = await response.json();
    return {
      isLoggedIn: data.isLoggedIn, // 로그인 상태 반환
      userName: data.userName, // 사용자 이름 반환
    };
  } catch (error) {
    console.error('Error fetching login status:', error);
    return {
      isLoggedIn: false,
      userName: '',
    };
  }
};

// 로그아웃 API 호출
export const logoutSocialLogin = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include', // 세션 기반 인증을 위해 쿠키를 포함한 요청
    });

    if (!response.ok) {
      throw new Error('Failed to logout');
    }

    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};
