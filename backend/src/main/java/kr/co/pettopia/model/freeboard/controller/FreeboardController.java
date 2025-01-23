package kr.co.pettopia.model.freeboard.controller;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreateCommentRequest;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.dto.ReadCommentListResponse;
import kr.co.pettopia.model.freeboard.dto.ReadPostListResponse;
import kr.co.pettopia.model.freeboard.dto.ReadSinglePostResponse;
import kr.co.pettopia.model.freeboard.dto.UpdateCommentRequest;
import kr.co.pettopia.model.freeboard.dto.UpdatePostRequest;
import kr.co.pettopia.model.freeboard.service.FreeboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
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
        return ResponseEntity.ok()
                .body(new ReadSinglePostResponse(post));
    }

    @PutMapping("/freeboard/posts/{id}")
    public ResponseEntity<UpdatePostRequest> updatePost(@PathVariable Integer id,
                                                        @RequestBody UpdatePostRequest request) {
        Post updatedPost = freeboardService.update(id, request);

        return ResponseEntity.ok()
                .body(new UpdatePostRequest(updatedPost));
    }

    @GetMapping("/freeboard/comment/{postId}")
    public ResponseEntity<List<ReadCommentListResponse>> getCommentsByPostId(@PathVariable("postId") Integer postId) {
        List<ReadCommentListResponse> comments = freeboardService.getAllComments(postId)
                .stream()
                .map(ReadCommentListResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(comments);
    }

    @PostMapping("/freeboard/comment")
    public ResponseEntity<CreateCommentRequest> createComment(@RequestBody CreateCommentRequest request) {
        freeboardService.createComment(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(request);
    }

    @PutMapping("/freeboard/comment/{commentId}")
    public ResponseEntity<UpdateCommentRequest> updateComment(
            @PathVariable("commentId") Integer commentId,
            @RequestBody UpdateCommentRequest request) {
        freeboardService.updateComment(commentId, request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(request);
    }
}
