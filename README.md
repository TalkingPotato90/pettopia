# 펫토피아 (Pettopia)
- 반려동물과 함께하는 사람들을 위한 커뮤니티를 제공합니다.

## 💻 프로젝트 기간 🔥
<table>
  <tr>
    <td>진행 기간</td>
    <td>2024.11.13 ~ 진행중 </td>
  </tr>
  <tr>
    <td>주간 회의</td>
    <td>매주 화요일 오후 8시</td>
  </tr>
  <tr>
    <td>코어 타임</td>
    <td>평일 오후 1시 - 오후 3시</td>
  </tr>
  <tr>
    <td>팀 페이지</td>
<td align="center"><a href="https://shadowed-plier-7d6.notion.site/Pettopia-13dbd3f53d9080419167fc56b655bd45"><img src ="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white"></a></td>
  </tr>
</table>

## 👤 팀 멤버
  <table>
    <tr>
      <td>Github Link</td>
      <td align="center"><a href="https://github.com/TalkingPotato90"><img src="https://avatars.githubusercontent.com/u/138276030?v=4" width="100"></a></td>
      <td align="center"><a href="https://github.com/ljhee92"><img src="https://avatars.githubusercontent.com/u/77716414?v=4" width="100"></a></td>
      <td align="center"><a href="https://github.com/dbsdndcks"><img src="https://avatars.githubusercontent.com/u/106324609?v=4" width="100"></a></td>
    </tr>
    <tr>
      <td>Blog Link</td>
      <td align="center"><a href="https://talkingpotato90.github.io/">TalkingPotato90 (고한별)</a></td>
      <td align="center"><a href="https://ju-heee.tistory.com/">ljhee92 (이주희)</a></td>
      <td align="center"><a href="https://velog.io/@sunset_1839/posts">DEV_WOONG (윤웅찬)</a></td>
    </tr>
        <tr>
      <td>주요 담당업무</td>
      <td align="center">🔐 보안</a></td>
      <td align="center">🛢️ DB 관리</a></td>
      <td align="center">📢 CI/CD</a></td>
    </tr>
  </table>

## 🌈 시스템 아키텍처
```mermaid
graph TD
    subgraph AWS 클라우드
        A[React 프론트엔드] -->|REST API 요청| B[Spring Boot 백엔드]
        B -->|데이터 저장/조회| C[(MySQL DB)]
        B -->|OAuth2 인증| D>소셜 로그인 API들]
    end

    subgraph 사용자
        U[사용자 브라우저] -->|HTTP 요청| A
    end
```

## 기술스택
![Java](https://img.shields.io/badge/jdk21-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SpringBoot](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Hibernate](https://img.shields.io/badge/jpa-59666C?style=for-the-badge&logo=Hibernate&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
