import logoWhite from '../assets/logoWhite.png'; // 이미지 경로를 수정하세요

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* 왼쪽 섹션 */}
        <div style={styles.left}>
          <h3 style={styles.logo}>Pettopia</h3>
          <div style={styles.icon}>
            <img src={logoWhite} alt="Pettopia Logo" style={styles.logoImage} />
          </div>
        </div>

        {/* 중앙 섹션 */}
        <div style={styles.center}>
          <a href="/privacy-policy" style={styles.link}>
            개인정보 처리방침
          </a>
          <span style={styles.separator}>|</span>
          <a href="/terms-of-service" style={styles.link}>
            이용약관
          </a>
          <span style={styles.separator}>|</span>
          <a href="/operation-policy" style={styles.link}>
            운영정책
          </a>
        </div>

        {/* 오른쪽 섹션 */}
        <div style={styles.right}>
          <p style={styles.email}>
            Email:{' '}
            <a href="mailto:mrb8215@gmail.com" style={styles.emailLink}>
              mrb8215@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* 하단 저작권 표시 */}
      <div style={styles.bottom}>Copyright © 2024; Designed by TEAM NOVA</div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c2f36',
    color: '#fff',
    width: '100%',
    padding: '10px 0', // 상단 패딩을 줄임
    position: 'relative',
    left: 0,
    right: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // 하단에 가까워지도록 정렬
    width: '100%',
    padding: '0 20px', // 좌우 여백
    boxSizing: 'border-box',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end', // 하단에 붙이기
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  icon: {
    textAlign: 'center',
  },
  logoImage: {
    width: '50px', // 이미지 크기를 줄임
    height: 'auto',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end', // 하단 정렬
    gap: '10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  separator: {
    color: '#fff',
    margin: '0 5px',
    fontSize: '0.9rem',
  },
  right: {
    textAlign: 'right',
    alignSelf: 'flex-end', // 하단 정렬
  },
  email: {
    fontSize: '0.9rem',
  },
  emailLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  bottom: {
    marginTop: '5px', // 저작권과 상단 사이 간격을 줄임
    borderTop: '1px solid #444',
    paddingTop: '5px', // 저작권과 구분선 간격 줄임
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#ccc',
  },
};

export default Footer;
