package kr.co.pettopia.model.pet.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import kr.co.pettopia.model.user.domain.User;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PET_ID", nullable = false)
    private int petId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_USER_TO_PET"))
    private User owner;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "BIRTHDAY", nullable = false)
    private LocalDate birthday;

    @Column(name = "GENDER")
    private char gender;

    @Column(name = "NEUTERING")
    private boolean neutering;

    public Pet update() {
        return this;
    }

    private void validateName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("반려동물 이름은 필수 입력 값입니다.");
        }
    }

    private void validateBirthday(LocalDate birthday) {
        if (birthday == null) {
            throw new IllegalArgumentException("반려동물 생일은 필수 입력 값입니다.");
        }
    }
}
