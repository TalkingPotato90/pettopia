package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.user.dto.UserInfoRequest;
import kr.co.pettopia.model.user.dto.UserInfoResponse;

import java.util.List;

public interface UserService {
    UserInfoResponse getUserInfo(String userId);
    UserInfoResponse updateUserInfo(String userId, UserInfoRequest userInfoRequest);
    List<Post> getPosts(String userId);
}
