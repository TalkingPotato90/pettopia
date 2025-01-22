package kr.co.pettopia.model.freeboard.dto;

import kr.co.pettopia.model.freeboard.domain.Comment;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreateCommentRequest {
    private String content;
    private Integer postId;
    private String userId;

    public Comment toEntity(Post post, User user) {
        return Comment.builder()
                .post(post)
                .user(user)
                .content(content)
                .build();
    }
}
