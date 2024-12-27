package kr.co.pettopia.model.freeboard.dto;

import kr.co.pettopia.model.freeboard.domain.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostDTO {
    private Integer postId;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private Integer view;
    private Integer recommend;

    public PostDTO(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = post.getUsers().getNickname();
        this.createdAt = post.getCreatedAt();
        this.view = post.getView();
        this.recommend = post.getRecommend();
    }
}
