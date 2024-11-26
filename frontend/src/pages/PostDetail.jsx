import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';

const PostDetail = ({ posts }) => {
  const { postId } = useParams(); // URL에서 현재 글의 ID를 가져옴
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const currentPostIndex = posts.findIndex(
    (post) => post.id === parseInt(postId),
  ); // 현재 글의 인덱스
  const surroundingPosts = posts.slice(
    Math.max(0, currentPostIndex - 10),
    Math.min(posts.length, currentPostIndex + 11),
  );

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
      {/* 현재 게시물 */}
      <div style={styles.postHeader}>
        <h1 style={styles.title}>
          {posts[currentPostIndex]?.title || '제목 없음'}
        </h1>
      </div>
      <div style={styles.metaContainer}>
        <span style={styles.metaItem}>
          작성자: {posts[currentPostIndex]?.author || '익명'}
        </span>
        <span style={styles.metaItem}>
          작성일: {posts[currentPostIndex]?.date || '날짜 없음'}
        </span>
        <span style={styles.metaItem}>
          조회수: {Math.floor(Math.random() * 1000) + 1}
        </span>
        <span style={styles.metaItem}>
          추천수: {Math.floor(Math.random() * 100)}
        </span>
        <span style={styles.metaItem}>
          댓글수: {Math.floor(Math.random() * 50)}
        </span>
      </div>
      <p style={styles.content}>
        {posts[currentPostIndex]?.content || '내용 없음'}
      </p>
      <ReactionButtons />
      <CommentSection
        comments={comments}
        newComment={newComment}
        onCommentChange={(e) => setNewComment(e.target.value)}
        onAddComment={handleAddComment}
        setNewComment={setNewComment} // 누락된 부분 추가
      />
      {/* 하단 게시판 리스트 */}
      <div style={styles.boardContainer}>
        <h3 style={styles.boardTitle}>게시판 목록</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>번호</th>
              <th style={styles.th}>제목</th>
              <th style={styles.th}>작성자</th>
              <th style={styles.th}>작성일</th>
              <th style={styles.th}>조회수</th>
            </tr>
          </thead>
          <tbody>
            {surroundingPosts.map((post, index) => (
              <tr
                key={post.id}
                style={{
                  backgroundColor:
                    currentPostIndex === index ? '#EAF4FF' : 'transparent',
                }}
              >
                <td style={styles.td}>{post.id}</td>
                <td style={styles.td}>
                  <a
                    href={`/community/postdetail/${post.id}`}
                    style={{
                      ...styles.link,
                      color: currentPostIndex === index ? '#007BFF' : '#000',
                    }}
                  >
                    {post.title}
                  </a>
                </td>
                <td style={styles.td}>{post.author}</td>
                <td style={styles.td}>{post.date}</td>
                <td style={styles.td}>
                  {Math.floor(Math.random() * 1000) + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    maxWidth: '800px',
    padding: 0,
    backgroundColor: 'transparent',
  },
  postHeader: {
    borderBottom: '1px solid #ddd', // 제목 아래 구분선
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#000', // 제목 색상 유지
  },
  metaContainer: {
    display: 'flex',
    flexWrap: 'wrap', // 작은 화면에서 줄바꿈
    gap: '10px',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#666',
  },
  metaItem: {
    marginRight: '10px',
    color: '#666', // 메타 정보 색상 유지
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#444',
  },
  boardContainer: {
    marginTop: '30px',
  },
  boardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
  link: {
    textDecoration: 'none',
  },
};

export default PostDetail;
