package kr.co.pettopia.model.user.dto;

import kr.co.pettopia.model.user.domain.User;

import java.time.LocalDate;

public record MyPageDTO(String nickname, LocalDate birthday, char gender,
                        char petOwn, String petName, LocalDate petBirthday, char petGender, char petNeutering,
                        String introduction) {

    public static MyPageDTO from(User user) {
        return new MyPageDTO(user.getNickname(), user.getBirthDay(), user.getGender(),
                user.getPetOwn(), user.getPet().getName(), user.getPet().getBirthday(),
                user.getPet().getGender(), user.getPet().getNeutering(),
                user.getIntroduction());
    }
}
