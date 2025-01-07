package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.user.dto.MyPageResponse;

public interface UserService {
    MyPageResponse getUserInfo(String userId);
}
