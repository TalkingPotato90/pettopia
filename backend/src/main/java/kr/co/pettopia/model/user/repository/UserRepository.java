package kr.co.pettopia.model.user.repository;

import kr.co.pettopia.model.user.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {
    Users findByUserId(String userId);

    Users findByEmail(String email);
}
