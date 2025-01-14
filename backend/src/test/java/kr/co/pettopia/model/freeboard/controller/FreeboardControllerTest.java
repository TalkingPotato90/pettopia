package kr.co.pettopia.model.freeboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.pettopia.model.freeboard.domain.Category;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.dto.UpdatePostRequest;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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

    private User user;
    private Category category;

    @BeforeEach
    public void setMockMvc() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.context)
                .build();

        user = User.builder()
                .userId("GOOGLE_12345")
                .nickname("테스트 유저")
                .provider("GOOGLE")
                .providerId("12345")
                .role("USER")
                .build();
        userRepository.save(user);

        category = new Category();
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
        final CreatePostRequest writtenPost = new CreatePostRequest(title, content, user.getUserId(), category.getCategoryId());

        final String requestBody = objectMapper.writeValueAsString(writtenPost);

        ResultActions result = mockMvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody));

        result.andExpect(status().isCreated());

        List<Post> posts = freeboardRepository.findAll();

        assertThat(posts).hasSize(1);
        assertThat(posts.getFirst().getTitle()).isEqualTo(title);
        assertThat(posts.getFirst().getContent()).isEqualTo(content);
        assertThat(posts.getFirst().getUser().getUserId()).isEqualTo(user.getUserId());
        assertThat(posts.getFirst().getCategory().getCategoryId()).isEqualTo(category.getCategoryId());
    }

    @DisplayName("[READ] 게시글 목록 조회")
    @Test
    public void readAllPosts() throws Exception {
        final String url = "/freeboard/posts";

        freeboardRepository.save(
                Post.builder()
                        .title("1번 제목")
                        .content("1번 내용")
                        .user(user)
                        .category(category)
                        .build());

        freeboardRepository.save(
                Post.builder()
                        .title("2번 제목")
                        .content("2번 내용")
                        .user(user)
                        .category(category)
                        .build());

        final ResultActions resultActions = mockMvc.perform(get(url)
                .accept(MediaType.APPLICATION_JSON));

        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("1번 제목"))
                .andExpect(jsonPath("$[1].title").value("2번 제목"));
    }

    @DisplayName("[READ] 단일 게시글 조회")
    @Test
    public void findPostById() throws Exception {
        final String url = "/freeboard/posts/{id}";
        final String title = "게시글 한 개";
        final String content = "조회하기";

        Post savedPost = freeboardRepository.save(
                Post.builder()
                        .title(title)
                        .content(content)
                        .user(user)
                        .category(category)
                        .build()
        );

        final ResultActions resultActions = mockMvc.perform(get(url, savedPost.getPostId()));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(title))
                .andExpect(jsonPath("$.content").value(content))
                .andExpect(jsonPath("$.view").value("1"));
    }

    @DisplayName("[UPDATE] 게시글 수정")
    @Test
    public void updatePost() throws Exception {
        final String url = "/freeboard/posts/{id}";
        final String title = "원래 제목";
        final String content = "원래 내용";

        Post savedPost = freeboardRepository.save(
                Post.builder()
                        .title(title)
                        .content(content)
                        .user(user)
                        .category(category)
                        .build()
        );

        final String newTitle = "바뀐 제목";
        final String newContent = "바뀐 내용";

        savedPost.setTitle(newTitle);
        savedPost.setContent(newContent);

        UpdatePostRequest writtenPost = new UpdatePostRequest(savedPost);

        ResultActions resultActions = mockMvc.perform(put(url, savedPost.getPostId())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(writtenPost)));

        resultActions.andExpect(status().isOk());

        Post post = freeboardRepository.findById(savedPost.getPostId()).get();

        assertThat(post.getTitle()).isEqualTo(newTitle);
        assertThat(post.getContent()).isEqualTo(newContent);
    }
}