package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import kr.co.pettopia.model.user.dto.MyPageRequest;
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
    private User user;

    @Column(name = "NAME")
    private String name;

    @Column(name = "BIRTHDAY")
    private LocalDate birthday;

    @Column(name = "GENDER")
    private char gender;

    @Column(name = "NEUTERING")
    private char neutering;

    public Pet update(MyPageRequest myPageRequest) {
        myPageRequest.petName().ifPresent(name -> this.name = name);
        myPageRequest.petBirthday().ifPresent(birthday -> this.birthday = birthday);
        myPageRequest.petGender().ifPresent(gender -> this.gender = gender);
        myPageRequest.petNeutering().ifPresent(neutering -> this.neutering = neutering);

        return this;
    }
}
