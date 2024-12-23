package kr.co.pettopia.model.freeboard.controller;

import kr.co.pettopia.model.freeboard.dto.PostDTO;
import kr.co.pettopia.model.freeboard.service.FreeboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/freeboard/posts")
public class FreeboardController {
    private final FreeboardService freeboardService;

    public FreeboardController(FreeboardService freeboardService) {
        this.freeboardService = freeboardService;
    }

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return freeboardService.getAllPosts();
    }
}
