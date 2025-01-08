export const fetchUser = async () => {
  try {
    const response = await fetch('/user/info');
    if (!response.ok) {
      throw new Error(
        `HTTP error, status: ${response.status}, statusText: ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (e) {
    alert(e);
    throw e;
  }
};
