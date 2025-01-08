package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.user.dto.UserInfoRequest;
import kr.co.pettopia.model.user.dto.UserInfoResponse;

public interface UserService {
    UserInfoResponse getUserInfo(String userId);
    UserInfoResponse updateUserInfo(String userId, UserInfoRequest userInfoRequest);
}
