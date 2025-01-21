DROP TABLE IF EXISTS PERMISSION;

CREATE TABLE IF NOT EXISTS USERS (
    USER_ID VARCHAR NOT NULL COMMENT 'PROVIDER와 PROVIDER_ID 조합으로 자동 생성',
    ROLE VARCHAR NOT NULL,
    PROVIDER_ID VARCHAR NOT NULL COMMENT '카카오,네이버,구글에서 제공받는 아이디',
    PROVIDER VARCHAR NOT NULL,
    EMAIL VARCHAR NULL,
    NICKNAME VARCHAR(100) NULL,
    HAS_PET BOOLEAN NULL,
    PROFILE_IMG_URL VARCHAR NULL,
    INTRODUCTION VARCHAR NULL,
    PRIMARY KEY (USER_ID)
);

CREATE TABLE IF NOT EXISTS CATEGORY (
    CATEGORY_ID VARCHAR NOT NULL COMMENT 'AUTO INCREMENT',
    NAME VARCHAR NULL,
    PRIMARY KEY (CATEGORY_ID)
);

CREATE TABLE IF NOT EXISTS POST (
    POST_ID INT AUTO_INCREMENT NOT NULL COMMENT 'AUTO INCREMENT',
    CATEGORY_ID VARCHAR NOT NULL,
    USER_ID VARCHAR NOT NULL COMMENT '작성자',
    TITLE VARCHAR NULL,
    CONTENT TEXT NULL,
    VIEW INT NULL,
    RECOMMAND INT NULL,
    PRIMARY KEY (POST_ID)
);

CREATE TABLE IF NOT EXISTS COMMENT (
    COMMENT_ID INT AUTO_INCREMENT NOT NULL COMMENT 'AUTO INCREMENT',
    POST_ID INT NOT NULL,
    USER_ID VARCHAR NOT NULL COMMENT '작성자',
    NICKNAME VARCHAR NOT NULL,
    CONTENT TEXT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (COMMENT_ID)
);

CREATE TABLE IF NOT EXISTS PERMISSION (
    ROLE VARCHAR NOT NULL,  -- ROLE_ID를 ROLE로 변경
    EDIT_OWN_POST BOOLEAN NULL,
    EDIT_ALL_POST BOOLEAN NULL,
    EDIT_OWN_COMMENT BOOLEAN NULL,
    EDIT_ALL_COMMENT BOOLEAN NULL,
    PRIMARY KEY (ROLE)
);

CREATE TABLE IF NOT EXISTS PET (
    PET_ID INT AUTO_INCREMENT NOT NULL COMMENT 'AUTO INCREMENT',
    USER_ID VARCHAR NOT NULL,
    NAME VARCHAR NULL,
    BIRTHDAY DATE NULL,
    GENDER CHAR NULL,
    NEUTERING BOOLEAN NULL,
    PRIMARY KEY (PET_ID)
);

-- POST 테이블에 외래 키 제약 조건 추가 (존재하면 삭제 후 추가)
ALTER TABLE POST DROP CONSTRAINT IF EXISTS FK_USER_TO_POST;
ALTER TABLE POST ADD CONSTRAINT FK_USER_TO_POST FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

-- COMMENT 테이블에 외래 키 제약 조건 추가 (존재하면 삭제 후 추가)
ALTER TABLE COMMENT DROP CONSTRAINT IF EXISTS FK_USER_TO_COMMENT;
ALTER TABLE COMMENT ADD CONSTRAINT FK_USER_TO_COMMENT FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);

-- PET 테이블에 외래 키 제약 조건 추가 (존재하면 삭제 후 추가)
ALTER TABLE PET DROP CONSTRAINT IF EXISTS FK_USER_TO_PET;
ALTER TABLE PET ADD CONSTRAINT FK_USER_TO_PET FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID);
