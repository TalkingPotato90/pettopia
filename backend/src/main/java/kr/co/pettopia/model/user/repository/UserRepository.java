package kr.co.pettopia.model.user.repository;

import kr.co.pettopia.model.user.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @EntityGraph(attributePaths = {"pet"})
    User findByUserId(String userId);

    User findByEmail(String email);
}
