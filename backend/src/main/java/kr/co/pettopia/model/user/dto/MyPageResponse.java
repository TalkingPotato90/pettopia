package kr.co.pettopia.model.user.dto;

import kr.co.pettopia.model.user.domain.User;

import java.time.LocalDate;

public record MyPageResponse(String nickname, LocalDate birthday, char gender,
                             char petOwn, String petName, LocalDate petBirthday, char petGender, char petNeutering,
                             String introduction) {

    public static MyPageResponse from(User user) {
        return new MyPageResponse(user.getNickname(), user.getBirthDay(), user.getGender(),
                user.getPetOwn(), user.getPet().getName(), user.getPet().getBirthday(),
                user.getPet().getGender(), user.getPet().getNeutering(),
                user.getIntroduction());
    }
}
