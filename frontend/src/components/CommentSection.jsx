import Comment from './Comment';

const CommentSection = ({
  comments,
  newComment,
  onCommentChange,
  onAddComment,
}) => {
  const renderComments = (parentId = null, level = 0) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          level={level}
          onAddComment={onAddComment}
          renderComments={renderComments}
        />
      ));
  };

  return (
    <div style={styles.commentSection}>
      <h2 style={styles.commentTitle}>댓글</h2>
      <div>{renderComments()}</div>
      <div style={styles.commentForm}>
        <textarea
          style={styles.textarea}
          placeholder="댓글을 입력하세요..."
          value={newComment} // 부모에서 전달된 상태 사용
          onChange={onCommentChange} // 부모 핸들러 사용
        ></textarea>
        <button
          style={styles.submitButton}
          onClick={() => onAddComment(null, newComment)} // 댓글 추가
        >
          댓글 작성
        </button>
      </div>
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
