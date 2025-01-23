package kr.co.pettopia.model.freeboard.repository;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.user.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FreeboardRepository extends JpaRepository<Post, Integer> {
    @EntityGraph(attributePaths = {"user"})
    List<Post> findAllByOrderByPostIdDesc();
    List<Post> findByUser(User user);
}
