export const fetchPost = async () => {
  try {
    const response = await fetch('/api/v1/freeboard/posts');
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (e) {
    alert(e);
    throw e;
  }
};
