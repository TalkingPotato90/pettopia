import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const ReactionButtons = () => {
  return (
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
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  likeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '120px',
    height: '50px',
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
    justifyContent: 'center',
    gap: '10px',
    width: '120px',
    height: '50px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '20px',
  },
};

export default ReactionButtons;
