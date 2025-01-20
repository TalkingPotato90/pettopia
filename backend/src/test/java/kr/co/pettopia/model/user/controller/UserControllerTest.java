package kr.co.pettopia.model.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.pettopia.model.auth.PrincipalDetails;
import kr.co.pettopia.model.freeboard.domain.Category;
import kr.co.pettopia.model.freeboard.domain.Comment;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.repository.CategoryRepository;
import kr.co.pettopia.model.freeboard.repository.CommentRepository;
import kr.co.pettopia.model.freeboard.repository.FreeboardRepository;
import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.pet.repository.PetRepository;
import kr.co.pettopia.model.user.domain.Role;
import kr.co.pettopia.model.user.domain.User;
import kr.co.pettopia.model.user.dto.ProfileRequest;
import kr.co.pettopia.model.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("마이페이지 테스트")
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PetRepository petRepository;

    @Autowired
    FreeboardRepository freeboardRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CategoryRepository categoryRepository;

    private User testUser;

    private static final String provider = "test";
    private static final String providerId = "12345";

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.context)
                .apply(springSecurity())
                .build();

        commentRepository.deleteAll();
        freeboardRepository.deleteAll();
        petRepository.deleteAll();
        userRepository.deleteAll();

        testUser = User.builder()
                .userId(provider + "_" + providerId)
                .role(Role.USER.getRole())
                .provider(provider)
                .providerId(providerId)
                .nickname("테스트 사용자")
                .hasPet(true)
                .profileImgUrl("profile.jpg")
                .introduction("hello")
                .build();
        userRepository.save(testUser);

        petRepository.save(Pet.builder()
                .name("강아지")
                .birthday(LocalDate.of(2024, 1, 1))
                .gender('M')
                .owner(testUser)
                .neutering(true)
                .build());

        PrincipalDetails testPrincipalDetails =
                new PrincipalDetails(userRepository.findByUserId(provider + "_" + providerId), Map.of());

        final SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(
                new UsernamePasswordAuthenticationToken(testPrincipalDetails, null, testPrincipalDetails.getAuthorities())
        );
        SecurityContextHolder.setContext(securityContext);
    }

    @DisplayName("[READ] 마이페이지 정보 조회")
    @Test
    void getProfile() throws Exception {
        final String url = "/user/info";
        final ResultActions resultActions = mockMvc.perform(get(url).accept(MediaType.APPLICATION_JSON));

        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value("테스트 사용자"))
                .andExpect(jsonPath("$.hasPet").value(true))
                .andExpect(jsonPath("$.profileImgUrl").value("profile.jpg"))
                .andExpect(jsonPath("$.introduction").value("hello"))
                .andExpect(jsonPath("$.petName").value("강아지"))
                .andExpect(jsonPath("$.petBirthday").value("2024-01-01"))
                .andExpect(jsonPath("$.petGender").value("M"))
                .andExpect(jsonPath("$.neutering").value(true));
    }

    @DisplayName("[UPDATE] 마이페이지 정보 수정")
    @Test
    void updateProfile() throws Exception {
        final String url = "/user/info";
        final String nickname = "바뀐 사용자 닉네임";
        final boolean hasPet = false;
        final String profileImgUrl = "update_profile.jpg";
        final String introduction = "hi~~~";

        final ProfileRequest updatedUserInfo =
                new ProfileRequest(nickname, hasPet, introduction, profileImgUrl, null, null, null, null, null);

        final ResultActions resultActions = mockMvc.perform(put(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedUserInfo)));

        resultActions.andExpect(status().isOk());

        User user = userRepository.findByUserId(testUser.getUserId());

        assertThat(user.getNickname()).isEqualTo(nickname);
        assertThat(user.isHasPet()).isEqualTo(hasPet);
        assertThat(user.getProfileImgUrl()).isEqualTo(profileImgUrl);
        assertThat(user.getIntroduction()).isEqualTo(introduction);
    }

    @DisplayName("[READ] 작성한 글 목록 조회")
    @Test
    void getPostsByUser() throws Exception {
        final String url = "/user/info/posts";
        final String title1 = "테스트 사용자 글 제목1";
        final String content1 = "테스트 사용자 글 내용1";
        final String title2 = "테스트 사용자 글 제목2";
        final String content2 = "테스트 사용자 글 내용2";

        Category category = new Category();
        category.setCategoryId("1");
        category.setName("테스트 카테고리");
        categoryRepository.save(category);

        freeboardRepository.save(
                Post.builder()
                        .title(title1)
                        .content(content1)
                        .user(testUser)
                        .category(category)
                        .build());

        freeboardRepository.save(
                Post.builder()
                        .title(title2)
                        .content(content2)
                        .user(testUser)
                        .category(category)
                        .build());

        final ResultActions resultActions = mockMvc.perform(get(url).accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value(title1))
                .andExpect(jsonPath("$[1].title").value(title2));
    }

    @DisplayName("[READ] 작성한 댓글의 글 목록 조회")
    @Test
    void getCommentsByUser() throws Exception {
        final String url = "/user/info/comments";
        final String title1 = "테스트 사용자 글 제목1";
        final String content1 = "테스트 사용자 글 내용1";

        Category category = new Category();
        category.setCategoryId("1");
        category.setName("테스트 카테고리");
        categoryRepository.save(category);

        Post testPost = freeboardRepository.save(
                Post.builder()
                        .title(title1)
                        .content(content1)
                        .user(testUser)
                        .category(category)
                        .build());

        Comment comment = new Comment();
        comment.setPost(testPost);
        comment.setUser(testUser);
        comment.setContent("테스트 코멘트");
        commentRepository.save(comment);

        final ResultActions resultActions = mockMvc.perform(get(url).accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value(title1));
    }
}