package kr.co.pettopia.model.user.dto;

import java.time.LocalDate;
import java.util.Optional;

public record MyPageRequest(Optional<String> nickname, Optional<LocalDate> birthday, Optional<Character> gender,
                            Optional<Character> petOwn, Optional<String> petName, Optional<LocalDate> petBirthday,
                            Optional<Character> petGender, Optional<Character> petNeutering,
                            Optional<String> profileImgUrl, Optional<String> introduction) {
}
