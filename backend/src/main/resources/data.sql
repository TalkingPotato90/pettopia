-- USER 데이터 삽입
INSERT INTO USERS (USER_ID, ROLE, PROVIDER, PROVIDER_ID, EMAIL, NICKNAME, HAS_PET, PROFILE_IMG_URL, INTRODUCTION, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES ('NAVER_12345', 'ROLE_USER', 'NAVER', '12345', 'admin@example.com', 'AdminUser', FALSE, null, 'hello', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
INSERT INTO USERS (USER_ID, ROLE, PROVIDER, PROVIDER_ID, EMAIL, NICKNAME, HAS_PET, PROFILE_IMG_URL, INTRODUCTION, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES ('KAKAO_12345', 'ROLE_USER', 'KAKAO', '12345', 'user1@example.com', 'UserOne', TRUE, null, 'hi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
INSERT INTO USERS (USER_ID, ROLE, PROVIDER, PROVIDER_ID, EMAIL, NICKNAME, HAS_PET, PROFILE_IMG_URL, INTRODUCTION, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES ('GOOGLE_12345', 'ROLE_USER', 'GOOGLE', '12345', 'user2@example.com', 'UserTwo', TRUE, null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
INSERT INTO USERS (USER_ID, ROLE, PROVIDER, PROVIDER_ID, EMAIL, NICKNAME, HAS_PET, PROFILE_IMG_URL, INTRODUCTION, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES ('google_107131721643965830645', 'ROLE_USER', 'google', '107131721643965830645', 'ljhee92.sist@gmail.com', '이주희', FALSE, null, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- CATEGORY 데이터 삽입
INSERT INTO CATEGORY (CATEGORY_ID, NAME) VALUES ('1', '자유게시판');

-- POST 데이터 삽입
INSERT INTO POST (POST_ID, CATEGORY_ID, USER_ID, TITLE, CONTENT, CREATED_AT, UPDATED_AT, VIEW, RECOMMEND, IS_DELETED)
VALUES (1, '1', 'KAKAO_12345', 'Welcome to the Forum', 'This is the first post.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 10, 5, 0);
INSERT INTO POST (POST_ID, CATEGORY_ID, USER_ID, TITLE, CONTENT, CREATED_AT, UPDATED_AT, VIEW, RECOMMEND, IS_DELETED)
VALUES (2, '1', 'NAVER_12345', 'Update Notice', 'We have updated our policies.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5, 2, 0);
INSERT INTO POST (POST_ID, CATEGORY_ID, USER_ID, TITLE, CONTENT, CREATED_AT, UPDATED_AT, VIEW, RECOMMEND, IS_DELETED)
VALUES (3, '1', 'google_107131721643965830645', 'Technical Tips', 'Here are some tips for beginners.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 100, 5, 1);

-- COMMENT 데이터 삽입
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES (1, 1, 'KAKAO_12345', 'Great post!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES (2, 2, 'NAVER_12345', 'Thanks for the update!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES (3, 3, 'GOOGLE_12345', 'Helpful tips, thank you!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES (4, 1, 'google_107131721643965830645', 'Great post!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT, IS_DELETED)
VALUES (5, 2, 'google_107131721643965830645', 'Thanks for the update!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- PERMISSION 데이터 삽입 (ROLE_ID 삭제)
INSERT INTO PERMISSION (ROLE, EDIT_OWN_POST, EDIT_ALL_POST, EDIT_OWN_COMMENT, EDIT_ALL_COMMENT)
VALUES ('ROLE_USER', TRUE, FALSE, TRUE, FALSE);
INSERT INTO PERMISSION (ROLE, EDIT_OWN_POST, EDIT_ALL_POST, EDIT_OWN_COMMENT, EDIT_ALL_COMMENT)
VALUES ('ROLE_ADMIN', TRUE, TRUE, TRUE, TRUE);

-- PET 데이터 삽입
INSERT INTO PET (PET_ID, USER_ID, NAME, BIRTHDAY, GENDER, NEUTERING)
VALUES (1, 'KAKAO_12345', '강아지', '2020-01-01', 'M', true);
INSERT INTO PET (PET_ID, USER_ID, NAME, BIRTHDAY, GENDER, NEUTERING)
VALUES (2, 'GOOGLE_12345', '고양이', '2023-12-10', 'F', false);