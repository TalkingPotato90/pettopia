import { useState } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const ReactionButtons = ({ recommend, onRecommendChange }) => {
  const [likes, setLikes] = useState(recommend || 0); // 추천 상태
  const [dislikes, setDislikes] = useState(0); // 비추천 상태

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    onRecommendChange(newLikes); // 추천수 업데이트
  };

  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes); // 비추천 업데이트
  };

  return (
    <div style={styles.buttonContainer}>
      <button style={styles.likeButton} onClick={handleLike}>
        <ThumbUpAltIcon style={styles.icon} />
        추천
        <span style={styles.counter}>{likes}</span>
      </button>
      <button style={styles.dislikeButton} onClick={handleDislike}>
        <ThumbDownAltIcon style={styles.icon} />
        비추천
        <span style={styles.counter}>{dislikes}</span>
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
    width: '150px',
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
    width: '150px',
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
  counter: {
    marginLeft: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
  },
};

export default ReactionButtons;
