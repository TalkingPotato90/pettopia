package kr.co.pettopia.model.freeboard.repository;

import kr.co.pettopia.model.freeboard.domain.Comment;
import kr.co.pettopia.model.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByUser(User user);
}
