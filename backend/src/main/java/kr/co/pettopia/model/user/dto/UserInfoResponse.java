package kr.co.pettopia.model.user.dto;

import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.user.domain.User;

import java.time.LocalDate;

public record UserInfoResponse(String nickname, boolean hasPet, String introduction, String profileImgUrl,
                               String petName, LocalDate petBirthday, Character petGender, Boolean neutering) {

    public static UserInfoResponse from(User user) {
        return new UserInfoResponse(user.getNickname(), user.isHasPet(), user.getIntroduction(), user.getProfileImgUrl(),
                null, null, null, null);
    }

    public static UserInfoResponse from(User user, Pet pet) {
        return new UserInfoResponse(user.getNickname(), user.isHasPet(), user.getIntroduction(), user.getProfileImgUrl(),
                pet.getName(), pet.getBirthday(), pet.getGender(), pet.isNeutering());
    }
}
