package kr.co.pettopia.model.freeboard.dto;

import java.time.LocalDateTime;
import kr.co.pettopia.model.freeboard.domain.Comment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadCommentListResponse {
    private Integer commentId;
    private Integer postId;
    private String userId;
    private String nickname;
    private String content;
    private LocalDateTime createdAt;

    public ReadCommentListResponse(Comment comment) {
        this.commentId = comment.getCommentId();
        this.postId = comment.getPost().getPostId();
        this.userId = comment.getUser().getUserId();  // User 엔티티에서 userId를 가져옵니다.
        this.nickname = comment.getUser().getNickname();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
    }
}
