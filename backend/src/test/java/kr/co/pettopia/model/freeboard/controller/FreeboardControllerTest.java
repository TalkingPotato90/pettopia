package kr.co.pettopia.model.freeboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.pettopia.model.freeboard.domain.Category;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.repository.CategoryRepository;
import kr.co.pettopia.model.freeboard.repository.FreeboardRepository;
import kr.co.pettopia.model.user.domain.User;
import kr.co.pettopia.model.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("자유게시판 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class FreeboardControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    FreeboardRepository freeboardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @BeforeEach
    public void setMockMvc(){
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.context)
                .build();

        User user = User.builder()
                .userId("GOOGLE_12345")
                .nickname("테스트 유저")
                .provider("GOOGLE")
                .providerId("12345")
                .role("USER")
                .build();
        userRepository.save(user);

        Category category = new Category();
        category.setCategoryId("1");
        category.setName("테스트 카테고리");
        categoryRepository.save(category);

        freeboardRepository.deleteAll();
    }

    @DisplayName("[CREATE] 게시글 작성")
    @Test
    public void createPost() throws Exception {
        final String url = "/freeboard/posts";
        final String title = "제목";
        final String content = "내용";
        final String userId = "GOOGLE_12345";
        final String categoryId = "1";
        final CreatePostRequest writtenPost = new CreatePostRequest(title, content, userId, categoryId);

        final String requestBody = objectMapper.writeValueAsString(writtenPost);

        ResultActions result = mockMvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody));

        result.andExpect(status().isCreated());

        List<Post> posts = freeboardRepository.findAll();

        assertThat(posts).hasSize(1);
        assertThat(posts.getFirst().getTitle()).isEqualTo(title);
        assertThat(posts.getFirst().getContent()).isEqualTo(content);
        assertThat(posts.getFirst().getUser().getUserId()).isEqualTo(userId);
        assertThat(posts.getFirst().getCategory().getCategoryId()).isEqualTo(categoryId);
    }
}