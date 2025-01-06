package kr.co.pettopia.model.user.repository;

import kr.co.pettopia.model.user.domain.Pet;
import kr.co.pettopia.model.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
    Pet findByUser(User user);
}
