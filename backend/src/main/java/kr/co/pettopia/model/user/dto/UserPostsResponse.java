package kr.co.pettopia.model.user.dto;

import kr.co.pettopia.model.freeboard.domain.Post;

import java.time.LocalDateTime;

public record UserPostsResponse(Integer postId, String categoryName, String title, LocalDateTime createdAt) {

    public static UserPostsResponse from(Post post) {
        return new UserPostsResponse(post.getPostId(), post.getCategory().getName(), post.getTitle(), post.getCreatedAt());
    }
}
