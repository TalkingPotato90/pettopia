package kr.co.pettopia.model.freeboard.service;

import kr.co.pettopia.model.freeboard.domain.Comment;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreateCommentRequest;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.dto.UpdatePostRequest;

import java.util.List;

public interface FreeboardService {
    List<Post> getAllPosts();
    Post createPost(CreatePostRequest request);
    Post findPostById(Integer id);
    Post update(Integer id, UpdatePostRequest request);

    List<Comment> getAllComments(Integer postId);
    Comment createComment(CreateCommentRequest request);
}
