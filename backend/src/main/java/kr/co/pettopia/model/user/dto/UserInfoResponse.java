package kr.co.pettopia.model.user.dto;

import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.user.domain.User;

import java.time.LocalDate;

public record UserInfoResponse(String nickname, LocalDate birthday, char gender,
                               boolean hasPet, String introduction,
                               String petName, LocalDate petBirthday, Character petGender, Boolean neutering) {

    public static UserInfoResponse from(User user) {
        return new UserInfoResponse(user.getNickname(), user.getBirthDay(), user.getGender(),
                user.isHasPet(), user.getIntroduction(),
                null, null, null, null);
    }

    public static UserInfoResponse from(User user, Pet pet) {
        return new UserInfoResponse(user.getNickname(), user.getBirthDay(), user.getGender(),
                user.isHasPet(), user.getIntroduction(),
                pet.getName(), pet.getBirthday(), pet.getGender(), pet.isNeutering());
    }
}
