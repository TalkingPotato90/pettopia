package kr.co.pettopia.model.freeboard.service;

import kr.co.pettopia.model.freeboard.domain.Category;
import kr.co.pettopia.model.freeboard.domain.Comment;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.dto.CreateCommentRequest;
import kr.co.pettopia.model.freeboard.dto.CreatePostRequest;
import kr.co.pettopia.model.freeboard.dto.UpdateCommentRequest;
import kr.co.pettopia.model.freeboard.dto.UpdatePostRequest;
import kr.co.pettopia.model.freeboard.repository.CategoryRepository;
import kr.co.pettopia.model.freeboard.repository.CommentRepository;
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
    private final CommentRepository commentRepository;


    public FreeboardServiceImpl(FreeboardRepository freeboardRepository,
                                UserRepository userRepository,
                                CategoryRepository categoryRepository,
                                CommentRepository commentRepository) {
        this.freeboardRepository = freeboardRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Post> getAllPosts() {
        return freeboardRepository.findAllByOrderByPostIdDesc();
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

    @Override
    public Post update(Integer id, UpdatePostRequest request) {
        Post post = freeboardRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("글 ID 오류"));

        post.updatePost(request.getTitle(), request.getContent());

        return freeboardRepository.save(post);
    }

    @Override
    public List<Comment> getAllComments(Integer postId) {
        return commentRepository.findByPostPostId(postId);
    }

    @Override
    public Comment createComment(CreateCommentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("작성자 ID 오류"));

        Post post = freeboardRepository.findById(request.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("글 ID 오류"));

        return commentRepository.save(request.toEntity(post, user));
    }

    @Override
    public Comment updateComment(Integer commentId, UpdateCommentRequest request) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 ID 오류"));

        comment.update(request.getContent());

        return commentRepository.save(comment);
    }


}
