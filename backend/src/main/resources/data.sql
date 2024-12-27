INSERT INTO USERS (USER_ID, ROLE, PROVIDER, PROVIDER_ID, EMAIL, NICKNAME, BIRTHDAY, GENDER, PET_OWN, PROFILE_IMG_URL, INTRODUCTION)
VALUES ('NAVER_12345', 'ROLE_USER', 'NAVER', '12345', 'admin@example.com', 'AdminUser', '1985-05-15', 'F', 'N', null, 'hello');
INSERT INTO USERS (USER_ID, ROLE, PROVIDER, PROVIDER_ID, EMAIL, NICKNAME, BIRTHDAY, GENDER, PET_OWN, PROFILE_IMG_URL, INTRODUCTION)
VALUES ('KAKAO_12345', 'ROLE_USER', 'KAKAO', '12345', 'user1@example.com', 'UserOne', '1990-01-01', 'M', 'Y', null, 'hi');
INSERT INTO USERS (USER_ID, ROLE, PROVIDER, PROVIDER_ID, EMAIL, NICKNAME, BIRTHDAY, GENDER, PET_OWN, PROFILE_IMG_URL, INTRODUCTION)
VALUES ('GOOGLE_12345', 'ROLE_USER', 'GOOGLE', '12345', 'user2@example.com', 'UserTwo', '1992-07-21', 'M', 'Y', null, null);

-- CATEGORY 데이터 삽입
INSERT INTO CATEGORY (CATEGORY_ID, NAME) VALUES ('1', '자유게시판');

-- POST 데이터 삽입
INSERT INTO POST (POST_ID, CATEGORY_ID, USER_ID, TITLE, CONTENT, CREATED_AT, UPDATED_AT, VIEW, RECOMMEND)
VALUES (1, '1', 'KAKAO_12345', 'Welcome to the Forum', 'This is the first post.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 10, 5);
INSERT INTO POST (POST_ID, CATEGORY_ID, USER_ID, TITLE, CONTENT, CREATED_AT, UPDATED_AT, VIEW, RECOMMEND)
VALUES (2, '1', 'NAVER_12345', 'Update Notice', 'We have updated our policies.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5, 2);
INSERT INTO POST (POST_ID, CATEGORY_ID, USER_ID, TITLE, CONTENT, CREATED_AT, UPDATED_AT, VIEW, RECOMMEND)
VALUES (3, '1', 'GOOGLE_12345', 'Technical Tips', 'Here are some tips for beginners.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 100, 5);

-- COMMENT 데이터 삽입
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT)
VALUES (1, 1, 'KAKAO_12345', 'Great post!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT)
VALUES (2, 2, 'NAVER_12345', 'Thanks for the update!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO COMMENT (COMMENT_ID, POST_ID, USER_ID, CONTENT, CREATED_AT, UPDATED_AT)
VALUES (3, 3, 'GOOGLE_12345', 'Helpful tips, thank you!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- PERMISSION 데이터 삽입 (ROLE_ID 삭제)
INSERT INTO PERMISSION (ROLE, EDIT_OWN_POST, EDIT_ALL_POST, EDIT_OWN_COMMENT, EDIT_ALL_COMMENT)
VALUES ('ROLE_USER', TRUE, FALSE, TRUE, FALSE);
INSERT INTO PERMISSION (ROLE, EDIT_OWN_POST, EDIT_ALL_POST, EDIT_OWN_COMMENT, EDIT_ALL_COMMENT)
VALUES ('ROLE_ADMIN', TRUE, TRUE, TRUE, TRUE);

-- PET 데이터 삽입
INSERT INTO PET (PET_ID, USER_ID, NAME, BIRTHDAY, GENDER, NEUTERING)
VALUES (1, 'KAKAO_12345', '강아지', '2020-01-01', 'M', 'Y');
INSERT INTO PET (PET_ID, USER_ID, NAME, BIRTHDAY, GENDER, NEUTERING)
VALUES (2, 'GOOGLE_12345', '고양이', '2023-12-10', 'F', 'Y');
