import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';
import Footer from '../components/Footer'; // Footer 컴포넌트 임포트

const PostDetail = ({ posts }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const POSTS_PER_PAGE = 10; // 한 페이지에 보여줄 게시글 수

  // `postId` 기반으로 해당 페이지 계산
  const initialPage = Math.ceil(parseInt(postId) / POSTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(initialPage); // 초기 페이지를 계산하여 설정

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE); // 총 페이지 수 계산

  // 현재 페이지에 맞는 게시글만 가져오기
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const currentPostIndex = posts.findIndex(
    (post) => post.id === parseInt(postId),
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
    setNewComment('');
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // 만약 URL로 이동 후 페이지가 리셋되는 경우를 방지
    setCurrentPage(initialPage);
  }, [postId]);

  return (
    <div style={styles.container}>
      {/* 상세 글 내용 */}
      <div style={styles.postContainer}>
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
          setNewComment={setNewComment}
        />
      </div>

      {/* 게시판 목록 */}
      <div style={styles.boardContainer}>
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
            {paginatedPosts.map((post) => (
              <tr key={post.id}>
                <td style={styles.td}>{post.id}</td>
                <td style={styles.td}>
                  <a
                    href={`/community/postdetail/${post.id}`}
                    style={styles.link}
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
        {/* 페이지네이션 버튼 추가 */}
        <div style={styles.pagination}>
          {/* 왼쪽 화살표 */}
          <button
            style={styles.arrowButton}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              style={{
                ...styles.pageButton,
                backgroundColor: currentPage === index + 1 ? '#ddd' : 'white',
              }}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {/* 오른쪽 화살표 */}
          <button
            style={styles.arrowButton}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
  postContainer: {
    padding: '20px',
    marginBottom: '30px',
    borderBottom: '2px solid #ddd',
  },
  postHeader: {
    paddingBottom: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  metaContainer: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  content: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  boardContainer: {
    marginTop: '30px',
  },
  boardDivider: {
    borderTop: '2px solid #ddd',
    margin: '20px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff', // 링크 색상
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    marginTop: '10px',
    marginBottom: '30px',
  },
  pageButton: {
    padding: '5px 10px',
    border: '1px solid #ddd',
    cursor: 'pointer',
  },
  arrowButton: {
    padding: '5px 10px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default PostDetail;
