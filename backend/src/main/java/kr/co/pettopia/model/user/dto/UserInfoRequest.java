package kr.co.pettopia.model.user.dto;

import java.time.LocalDate;

public record UserInfoRequest(String nickname, boolean hasPet, String introduction,
                              String profileImgUrl, String profileImgBase64,
                              String petName, LocalDate petBirthday, Character petGender, Boolean neutering) {
}
