import { useState } from 'react';

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
    <div style={{ marginLeft: level * 20 }}>
      <div style={styles.commentMeta}>
        <span style={styles.commentAuthor}>{comment.author}</span>
        <span style={styles.commentDate}>{comment.date}</span>
      </div>
      <p style={styles.commentContent}>{comment.content}</p>
      {/* level이 1 이하일 때만 답글 버튼을 표시 */}
      {level < 1 && (
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
      {renderComments(comment.id, level + 1)}
    </div>
  );
};

const styles = {
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
