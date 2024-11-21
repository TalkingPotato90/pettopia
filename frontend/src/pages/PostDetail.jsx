import * as React from 'react';
import { useState } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; // 엄지 척 아이콘
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'; // 엄지 아래 아이콘

function PostDetail() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newCommentData = {
      id: comments.length + 1,
      author: '익명',
      content: newComment,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    setComments([...comments, newCommentData]);
    setNewComment('');
  };

  return (
    <div style={styles.container}>
      {/* 게시물 상단 정보 */}
      <h1 style={styles.title}>[공지] 자유게시판 이용 안내</h1>
      <div style={styles.meta}>
        <span style={styles.author}>작성자: 윤웅찬</span>
        <span style={styles.date}>2024.11.21 11:11:57</span>
      </div>
      <img
      />
      <p style={styles.content}>
        자유게시판을 이용해 주셔서 감사합니다. 공지사항을 꼭 읽어주세요. 이 페이지는 더미 데이터로 구성되어 있으며, 클릭 동작 없이도 화면을 미리 확인할 수 있습니다.
      </p>
      <p style={styles.content}>
        자유롭게 의견을 공유하며, 서로 간의 예의를 지켜주세요!
      </p>

      {/* 추천/비추천 버튼 */}
      <div style={styles.buttonContainer}>
        <button style={styles.likeButton}>
          <ThumbUpAltIcon style={styles.icon} />
          추천
        </button>
        <button style={styles.dislikeButton}>
          <ThumbDownAltIcon style={styles.icon} />
          비추천
        </button>
      </div>

      {/* 댓글 리스트 */}
      <div style={styles.commentSection}>
        <h2 style={styles.commentTitle}>댓글</h2>
        <ul style={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} style={styles.commentItem}>
              <div style={styles.commentMeta}>
                <span style={styles.commentAuthor}>{comment.author}</span>
                <span style={styles.commentDate}>{comment.date}</span>
              </div>
              <p style={styles.commentContent}>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 댓글 작성 */}
      <div style={styles.commentForm}>
        <textarea
          style={styles.textarea}
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button style={styles.submitButton} onClick={handleAddComment}>
          댓글 작성
        </button>
      </div>
    </div>
  );
}

// 스타일 객체
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
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '20px',
    borderRadius: '4px',
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  likeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 텍스트 정렬
    gap: '10px',
    width: '120px', // 버튼 너비 고정
    height: '50px', // 버튼 높이 고정
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  dislikeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 텍스트 정렬
    gap: '10px',
    width: '120px', // 버튼 너비 고정 (추천과 동일)
    height: '50px', // 버튼 높이 고정 (추천과 동일)
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '20px', // 아이콘 크기
  },
  commentSection: {
    marginTop: '30px',
  },
  commentTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  commentList: {
    listStyle: 'none',
    padding: '0',
  },
  commentItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  commentMeta: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '5px',
  },
  commentAuthor: {
    marginRight: '10px',
    fontWeight: 'bold',
  },
  commentDate: {
    color: '#666',
  },
  commentContent: {
    fontSize: '16px',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  submitButton: {
    alignSelf: 'flex-end',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PostDetail;
