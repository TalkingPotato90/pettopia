package kr.co.pettopia.model.freeboard.service;

import kr.co.pettopia.model.freeboard.domain.Category;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.repository.CategoryRepository;
import kr.co.pettopia.model.freeboard.repository.FreeboardRepository;
import kr.co.pettopia.model.user.domain.User;
import kr.co.pettopia.model.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FreeboardServiceImpl implements FreeboardService{
    private final FreeboardRepository freeboardRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public FreeboardServiceImpl(FreeboardRepository freeboardRepository,
                                UserRepository userRepository,
                                CategoryRepository categoryRepository) {
        this.freeboardRepository = freeboardRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Post> getAllPosts() {
        return freeboardRepository.findAll();
    }

    @Override
    public Post createPost(CreatePostRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("작성자 ID 오류"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("글 카테고리 오류"));

        return freeboardRepository.save(request.toEntity(user,category));
    }

    @Override
    public Post findPostById(Integer id) {
        Post readPost = freeboardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("글 ID 오류"));

        readPost.updateViewCount();
        freeboardRepository.save(readPost);

        return readPost;
    }
}
