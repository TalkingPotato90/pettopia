import Comment from './Comment';

const CommentSection = ({
  comments,
  newComment,
  onCommentChange,
  onAddComment,
  user, // user 객체를 props로 받음
}) => {
  // 댓글 렌더링 함수
  const renderComments = () => {
    return comments.map((comment) => (
      <Comment
        key={comment.commentId}
        comment={comment}
        onAddComment={onAddComment}
      />
    ));
  };

  return (
    <div style={styles.commentSection}>
      <h2 style={styles.commentTitle}>댓글</h2>
      <div>{renderComments()}</div>

      {/* 로그인 상태에 따라 댓글 입력 폼 보이기 */}
      {user.isLoggedIn ? (
        <div style={styles.commentForm}>
          <textarea
            style={styles.textarea}
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={onCommentChange}
          ></textarea>
          <button
            style={styles.submitButton}
            onClick={() => onAddComment(newComment)}
          >
            댓글 작성
          </button>
        </div>
      ) : (
        <div style={styles.commentForm}>
          <textarea
            style={styles.textarea}
            placeholder="로그인 후 댓글을 작성할 수 있습니다..."
            value=""
            disabled
          ></textarea>
        </div>
      )}
    </div>
  );
};

const styles = {
  commentSection: { marginTop: '30px' },
  commentTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' },
  commentForm: { display: 'flex', flexDirection: 'column', marginTop: '20px' },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    color: '#888', // 회색 글씨로 로그인 후 표시된 메시지를 강조
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

export default CommentSection;
