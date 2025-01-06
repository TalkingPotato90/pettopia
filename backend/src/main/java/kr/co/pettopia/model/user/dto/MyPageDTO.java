package kr.co.pettopia.model.user.dto;

import kr.co.pettopia.model.user.domain.Pet;
import kr.co.pettopia.model.user.domain.User;

import java.time.LocalDate;

public record MyPageDTO(String nickname, LocalDate birthday, char gender,
                        char petOwn, String petName, LocalDate petBirthday, char petGender, char petNeutering,
                        String introduction) {

    public static MyPageDTO from(User user, Pet pet) {
        return new MyPageDTO(user.getNickname(), user.getBirthDay(), user.getGender(),
                user.getPatOwn(), pet.getName(), pet.getBirthday(), pet.getGender(), pet.getNeutering(),
                user.getIntroduction());
    }
}
