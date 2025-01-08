package kr.co.pettopia.model.freeboard.repository;

import kr.co.pettopia.model.freeboard.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
}
