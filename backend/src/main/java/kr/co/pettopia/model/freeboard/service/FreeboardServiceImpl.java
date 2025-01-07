package kr.co.pettopia.model.freeboard.service;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.repository.FreeboardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FreeboardServiceImpl implements FreeboardService{
    private final FreeboardRepository freeboardRepository;

    public FreeboardServiceImpl(FreeboardRepository freeboardRepository) {
        this.freeboardRepository = freeboardRepository;
    }

    @Override
    public List<Post> getAllPosts() {
        return freeboardRepository.findAll();
    }

    @Override
    public Post createPost(CreatePostRequest request) {
        return freeboardRepository.save(request.toEntity());
    }
}
