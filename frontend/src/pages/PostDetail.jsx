import { useState } from 'react';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';

const PostDetail = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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
    setNewComment(''); // 입력란 초기화
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>[공지] 자유게시판 이용 안내</h1>
      <div style={styles.meta}>
        <span style={styles.author}>작성자: 윤웅찬</span>
        <span style={styles.date}>2024.11.21 11:11:57</span>
      </div>
      <p style={styles.content}>
        자유게시판을 이용해 주셔서 감사합니다. 공지사항을 꼭 읽어주세요.
      </p>
      <ReactionButtons />
      <CommentSection
        comments={comments}
        newComment={newComment}
        onCommentChange={(e) => setNewComment(e.target.value)}
        onAddComment={handleAddComment}
        setNewComment={setNewComment} // 추가된 부분
      />
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    maxWidth: '800px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  meta: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
  },
  author: {
    marginRight: '10px',
  },
  date: {
    color: '#666',
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
};

export default PostDetail;
