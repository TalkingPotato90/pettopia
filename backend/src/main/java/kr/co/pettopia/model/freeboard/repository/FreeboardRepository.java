package kr.co.pettopia.model.freeboard.repository;

import kr.co.pettopia.model.freeboard.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeboardRepository extends JpaRepository<Post, Integer> {
}
