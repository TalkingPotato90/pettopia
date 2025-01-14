package kr.co.pettopia.model.freeboard.dto;

import kr.co.pettopia.model.freeboard.domain.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdatePostRequest {
    private String title;
    private String content;

    public UpdatePostRequest(Post post) {
        this.title = post.getTitle();
        this.content = post.getContent();
    }
}
