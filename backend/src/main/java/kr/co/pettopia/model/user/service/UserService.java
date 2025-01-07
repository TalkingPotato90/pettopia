package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.user.dto.MyPageRequest;
import kr.co.pettopia.model.user.dto.MyPageResponse;

public interface UserService {
    MyPageResponse getUserInfo(String userId);
    MyPageResponse updateUserInfo(String userId, MyPageRequest myPageRequest);
}
