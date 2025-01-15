package kr.co.pettopia.model.user.dto;

import java.time.LocalDate;

public record ProfileDTO (String nickname, boolean hasPet, String introduction,
                          String profileImgUrl, String profileImgBase64,
                          String petName, LocalDate petBirthday, Character petGender, Boolean neutering) {

    public static ProfileDTO of(UserInfoRequest userInfoRequest) {
        return new ProfileDTO(userInfoRequest.nickname(), userInfoRequest.hasPet(), userInfoRequest.introduction(),
                userInfoRequest.profileImgUrl(), userInfoRequest.profileImgBase64(),
                userInfoRequest.petName(), userInfoRequest.petBirthday(),
                userInfoRequest.petGender(), userInfoRequest.neutering());
    }
}
