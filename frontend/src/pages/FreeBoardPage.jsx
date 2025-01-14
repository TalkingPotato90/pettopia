import { useEffect, useState } from 'react';
import { fetchPost } from '../api/fetchPost';
import FreeBoard from './FreeBoard';

function FreeBoardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPost();
        setPosts(data);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <FreeBoard posts={posts} isLoggedIn={true} />;
}

export default FreeBoardPage;
