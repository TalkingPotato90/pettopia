import { useState } from 'react';
const MAX_LEVEL = 1; // 최대 허용 레벨 (0: 댓글, 1: 대댓글)

const Comment = ({ comment, level, onAddComment, renderComments }) => {
  const [reply, setReply] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    if (reply.trim() === '') return;
    onAddComment(comment.id, reply, level + 1);
    setReply('');
    setShowReplyForm(false);
  };

  return (
    <div style={styles.commentContainer}>
      <div
        style={{
          display: 'flex',
          marginLeft: `${level * 20}px`, // 대댓글 레벨별 들여쓰기
          position: 'relative',
        }}
      >
        {level > 0 && <div style={styles.indicator}></div>}
        <div style={{ flex: 1 }}>
          <div style={styles.commentMeta}>
            <span style={styles.commentAuthor}>{comment.author}</span>
            <span style={styles.commentDate}>{comment.date}</span>
          </div>
          <p style={styles.commentContent}>{comment.content}</p>
          {/* 답글 버튼을 MAX_LEVEL 이하일 때만 표시 */}
          {level < MAX_LEVEL && (
            <button
              style={styles.replyButton}
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              답글
            </button>
          )}
          {showReplyForm && (
            <div style={styles.replyForm}>
              <textarea
                style={styles.textarea}
                placeholder="답글을 입력하세요..."
                value={reply}
                onChange={handleReplyChange}
              ></textarea>
              <button style={styles.submitButton} onClick={handleReplySubmit}>
                답글 작성
              </button>
            </div>
          )}
        </div>
      </div>
      {/* 다음 레벨 댓글은 MAX_LEVEL 이하일 때만 렌더링 */}
      {level < MAX_LEVEL && renderComments(comment.id, level + 1)}
    </div>
  );
};

const styles = {
  commentContainer: {
    marginBottom: '10px',
  },
  indicator: {
    position: 'absolute',
    top: '12px',
    left: '-15px',
    width: '15px',
    height: '15px',
    borderLeft: '2px solid #007BFF',
    borderBottom: '2px solid #007BFF',
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
  replyButton: {
    fontSize: '14px',
    color: '#007BFF',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    marginBottom: '10px',
  },
  replyForm: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '60px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  submitButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Comment;
