package kr.co.pettopia.model.freeboard.service;

import kr.co.pettopia.model.freeboard.dto.PostDTO;
import kr.co.pettopia.model.freeboard.repository.FreeboardRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FreeboardServiceImpl implements FreeboardService{
    private final FreeboardRepository freeboardRepository;

    public FreeboardServiceImpl(FreeboardRepository freeboardRepository) {
        this.freeboardRepository = freeboardRepository;
    }

    @Override
    public List<PostDTO> getAllPosts() {
        return freeboardRepository.findAll().stream()
                .map(PostDTO::new)
                .collect(Collectors.toList());
    }
}
