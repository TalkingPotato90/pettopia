export const getUserAndPetInfo = async () => {
  try {
    const response = await fetch('/user/info', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error, status: ${response.status}, statusText: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('ERROR : ', error);
  }
};

export const updateUserAndPetInfo = async (updatedInfo) => {
  try {
    const response = await fetch('/user/info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInfo),
      credentials: 'include',
    });

    if (response.ok) {
      alert('수정 완료되었습니다.');
    }

    if (!response.ok) {
      throw new Error(
        `HTTP error, status: ${response.status}, statusText: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('ERROR : ', error);
  }
};

export const getUserPosts = async () => {
  try {
    const response = await fetch('/user/info/posts', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error, status: ${response.status}, statusText: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('ERROR : ', error);
  }
};

export const getUserComments = async () => {
  try {
    const response = await fetch('/user/info/comments', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error, status: ${response.status}, statusText: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('ERROR : ', error);
  }
};
