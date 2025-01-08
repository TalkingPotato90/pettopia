package kr.co.pettopia.model.pet.repository;

import kr.co.pettopia.model.pet.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Integer> {
}
