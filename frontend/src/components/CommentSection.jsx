import Comment from './Comment';

const CommentSection = ({
  comments,
  newComment,
  onCommentChange,
  onAddComment,
}) => {
  // 댓글 렌더링 함수
  const renderComments = () => {
    // 댓글을 필터링 없이 바로 맵핑하여 렌더링
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
      <div style={styles.commentForm}>
        <textarea
          style={styles.textarea}
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={onCommentChange} // 댓글 내용 변경 핸들러
        ></textarea>
        <button
          style={styles.submitButton}
          onClick={() => onAddComment(null, newComment)} // 댓글 작성 버튼 클릭 시
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
