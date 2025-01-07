package kr.co.pettopia.model.freeboard.dto;

import kr.co.pettopia.model.freeboard.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreatePostRequest {

    private String title;
    private String content;

    public Post toEntity(){
        return Post.builder()
                .title(title)
                .content(content)
                .build();
    }
}
