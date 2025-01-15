package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.user.domain.Profile;
import kr.co.pettopia.model.user.dto.ProfileDTO;

import java.util.List;

public interface UserService {
    Profile getUserInfo(String userId);
    Profile updateUserInfo(String userId, ProfileDTO profileDTO);
    List<Post> getPosts(String userId);
    List<Post> getPostsOfComments(String userId);
}
