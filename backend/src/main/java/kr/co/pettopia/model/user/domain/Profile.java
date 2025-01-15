package kr.co.pettopia.model.user.domain;

import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.user.dto.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    private User user;
    private Pet pet;

    public static Profile of(User user, Pet pet) {
        if (pet == null) {
            return new Profile(user, null);
        }

        return new Profile(user, pet);
    }

    public Profile update(ProfileDTO profileDTO) {
        this.user = user.update(profileDTO);

        if (pet == null && profileDTO.hasPet()) {
            this.pet = createPet(user, profileDTO);
        }

        if (pet != null && profileDTO.hasPet()) {
            this.pet = pet.update(profileDTO);
        }

        return this;
    }

    private Pet createPet(User user, ProfileDTO profileDTO) {
        return Pet.builder()
                .owner(user)
                .name(profileDTO.petName())
                .birthday(profileDTO.petBirthday())
                .gender(profileDTO.petGender())
                .neutering(profileDTO.neutering())
                .build();
    }
}
