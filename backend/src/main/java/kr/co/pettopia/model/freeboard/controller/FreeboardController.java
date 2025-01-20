package kr.co.pettopia.model.freeboard.controller;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.dto.ReadPostListResponse;
import kr.co.pettopia.model.freeboard.dto.ReadSinglePostResponse;
import kr.co.pettopia.model.freeboard.dto.UpdatePostRequest;
import kr.co.pettopia.model.freeboard.service.FreeboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class FreeboardController {
    private final FreeboardService freeboardService;

    @GetMapping("/freeboard/posts")
    public ResponseEntity<List<ReadPostListResponse>> getAllPosts() {
        List<ReadPostListResponse> posts = freeboardService.getAllPosts()
                .stream()
                .map(ReadPostListResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(posts);
    }

    @PostMapping("/freeboard/posts")
    public ResponseEntity<CreatePostRequest> createPost(@RequestBody CreatePostRequest request) {
        freeboardService.createPost(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(request);
    }

    @GetMapping("/freeboard/posts/{id}")
    public ResponseEntity<ReadSinglePostResponse> findPost(@PathVariable("id") Integer id) {
        Post post = freeboardService.findPostById(id);
        System.out.println("=============");
        System.out.println("=============");
        System.out.println("=============");
        System.out.println("=============");
        System.out.println("=============");
        System.out.println(post.toString());
        System.out.println(post);
        return ResponseEntity.ok()
                .body(new ReadSinglePostResponse(post));
    }

    @PutMapping("/freeboard/posts/{id}")
    public ResponseEntity<UpdatePostRequest> updatePost(@PathVariable Integer id, @RequestBody UpdatePostRequest request) {
        Post updatedPost = freeboardService.update(id, request);

        return ResponseEntity.ok()
                .body(new UpdatePostRequest(updatedPost));
    }
}
