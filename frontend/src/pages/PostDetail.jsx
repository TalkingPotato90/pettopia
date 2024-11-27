import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';
import Footer from '../components/Footer'; // Footer 컴포넌트 임포트

const PostDetail = ({ posts }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const currentPostIndex = posts.findIndex(
    (post) => post.id === parseInt(postId),
  );
  const surroundingPosts = posts.slice(
    Math.max(0, currentPostIndex - 10),
    Math.min(posts.length, currentPostIndex + 11),
  );

  const handleAddComment = (parentId = null, content) => {
    if (content.trim() === '') return;

    const newCommentData = {
      id: comments.length + 1,
      author: '익명',
      content: content,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      parentId: parentId,
    };

    setComments([...comments, newCommentData]);
    setNewComment('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.postHeader}>
        <h1 style={styles.title}>
          {posts[currentPostIndex]?.title || '제목 없음'}
        </h1>
      </div>
      <div style={styles.metaContainer}>
        <span style={styles.metaItem}>
          작성자: {posts[currentPostIndex]?.author || '익명'}
        </span>
        <span style={styles.metaItem}>
          작성일: {posts[currentPostIndex]?.date || '날짜 없음'}
        </span>
        <span style={styles.metaItem}>
          조회수: {Math.floor(Math.random() * 1000) + 1}
        </span>
      </div>
      <p style={styles.content}>
        {posts[currentPostIndex]?.content || '내용 없음'}
      </p>
      <ReactionButtons />
      <CommentSection
        comments={comments}
        newComment={newComment}
        onCommentChange={(e) => setNewComment(e.target.value)}
        onAddComment={handleAddComment}
        setNewComment={setNewComment}
      />
      <div style={styles.boardContainer}>
        <h3 style={styles.boardTitle}>게시판 목록</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>번호</th>
              <th style={styles.th}>제목</th>
              <th style={styles.th}>작성자</th>
              <th style={styles.th}>작성일</th>
              <th style={styles.th}>조회수</th>
            </tr>
          </thead>
          <tbody>
            {surroundingPosts.map((post) => (
              <tr key={post.id}>
                <td style={styles.td}>{post.id}</td>
                <td style={styles.td}>
                  <a
                    href={`/community/postdetail/${post.id}`}
                    style={styles.link}
                  >
                    {post.title}
                  </a>
                </td>
                <td style={styles.td}>{post.author}</td>
                <td style={styles.td}>{post.date}</td>
                <td style={styles.td}>
                  {Math.floor(Math.random() * 1000) + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
  postHeader: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  metaContainer: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
  },
  content: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  boardContainer: {
    marginTop: '30px',
  },
  boardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
  link: {
    textDecoration: 'none',
  },
};

export default PostDetail;
