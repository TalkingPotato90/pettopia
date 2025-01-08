package kr.co.pettopia.model.freeboard.controller;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.dto.ReadPostResponse;
import kr.co.pettopia.model.freeboard.service.FreeboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class FreeboardController {
    private final FreeboardService freeboardService;

    @GetMapping("/freeboard/posts")
    public ResponseEntity<List<ReadPostResponse>> getAllPosts() {
        List<ReadPostResponse> posts = freeboardService.getAllPosts()
                .stream()
                .map(ReadPostResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(posts);
    }

    @PostMapping("/freeboard/posts")
    public ResponseEntity<Post> createPost(@RequestBody CreatePostRequest request) {
        Post createdPost = freeboardService.createPost(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdPost);
    }
}
