package kr.co.pettopia.model.freeboard.repository;

import kr.co.pettopia.model.freeboard.domain.Post;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FreeboardRepository extends JpaRepository<Post, Integer> {
    @EntityGraph(attributePaths = {"users"})
    List<Post> findAll();
}
