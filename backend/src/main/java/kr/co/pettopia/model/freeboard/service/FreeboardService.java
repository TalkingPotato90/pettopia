package kr.co.pettopia.model.freeboard.service;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;

import java.util.List;

public interface FreeboardService {
    List<Post> getAllPosts();
    Post createPost(CreatePostRequest request);
}
