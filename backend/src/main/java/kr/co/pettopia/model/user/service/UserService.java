package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.user.dto.MyPageDTO;

public interface UserService {
    MyPageDTO getUserInfo(String userId);
}
