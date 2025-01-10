package kr.co.pettopia.model.freeboard.dto;

import kr.co.pettopia.model.freeboard.domain.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReadPostListResponse {
    private Integer postId;
    private String title;
    private String author;
    private LocalDateTime createdAt;
    private Integer view;
    private Integer recommend;

    public ReadPostListResponse(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.author = post.getUser().getNickname();
        this.createdAt = post.getCreatedAt();
        this.view = post.getView();
        this.recommend = post.getRecommend();
    }
}
