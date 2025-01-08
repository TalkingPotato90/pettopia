package kr.co.pettopia.model.freeboard.dto;

import kr.co.pettopia.model.freeboard.domain.Category;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreatePostRequest {

    private String title;
    private String content;
    private String userId;
    private String categoryId;

    public Post toEntity(User user, Category category){
        return Post.builder()
                .title(title)
                .content(content)
                .user(user)
                .category(category)
                .build();
    }
}
