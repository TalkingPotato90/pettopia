const Comment = ({ comment }) => {
  return (
    <div style={styles.commentContainer}>
      <div style={styles.commentMeta}>
        <span style={styles.commentAuthor}>{comment.nickname}</span>
        <span style={styles.commentDate}>
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p style={styles.commentContent}>{comment.content}</p>
    </div>
  );
};

const styles = {
  commentContainer: {
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
};

export default Comment;
