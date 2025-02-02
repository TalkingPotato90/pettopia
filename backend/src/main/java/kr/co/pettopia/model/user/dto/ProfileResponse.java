package kr.co.pettopia.model.user.dto;

import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.user.domain.Profile;
import kr.co.pettopia.model.user.domain.User;

import java.time.LocalDate;

public record ProfileResponse(String nickname, boolean hasPet, String introduction, String profileImgUrl,
                              String petName, LocalDate petBirthday, Character petGender, Boolean neutering) {

    public static ProfileResponse from(Profile profile) {
        User user = profile.getUser();
        Pet pet = profile.getPet();

        if (pet == null) {
            return new ProfileResponse(user.getNickname(), user.isHasPet(), user.getIntroduction(), user.getProfileImgUrl(),
                null, null, null, null);
        }

        return new ProfileResponse(user.getNickname(), user.isHasPet(), user.getIntroduction(), user.getProfileImgUrl(),
                pet.getName(), pet.getBirthday(), pet.getGender(), pet.isNeutering());
    }
}
