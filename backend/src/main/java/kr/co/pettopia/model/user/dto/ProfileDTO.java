package kr.co.pettopia.model.user.dto;

import java.time.LocalDate;

public record ProfileDTO (String nickname, boolean hasPet, String introduction,
                          String profileImgUrl, String profileImgBase64,
                          String petName, LocalDate petBirthday, Character petGender, Boolean neutering) {

    public static ProfileDTO of(ProfileRequest profileRequest) {
        return new ProfileDTO(profileRequest.nickname(), profileRequest.hasPet(), profileRequest.introduction(),
                profileRequest.profileImgUrl(), profileRequest.profileImgBase64(),
                profileRequest.petName(), profileRequest.petBirthday(),
                profileRequest.petGender(), profileRequest.neutering());
    }
}
