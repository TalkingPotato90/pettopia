package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import kr.co.pettopia.model.BaseEntity;
import kr.co.pettopia.model.user.dto.MyPageRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Optional;

@Entity
@Data
@Builder
@Table(name = "USERS")
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    @Id
    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "ROLE", nullable = false)
    private String role;

    @Column(name = "PROVIDER_ID", nullable = false)
    private String providerId;

    @Column(name = "PROVIDER", nullable = false)
    private String provider;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "NICKNAME", length = 100)
    private String nickname;

    @Column(name = "BIRTHDAY")
    private LocalDate birthDay;

    @Column(name = "GENDER")
    private char gender;

    @Column(name = "PET_OWN")
    private char petOwn;

    @Column(name = "PROFILE_IMG_URL")
    private String profileImgUrl;

    @Column(name = "INTRODUCTION")
    private String introduction;

    @OneToOne(mappedBy = "user", optional = true)
    private Pet pet;

    public User update(MyPageRequest myPageRequest) {
        myPageRequest.nickname().ifPresent(nickname -> this.nickname = nickname);
        myPageRequest.birthday().ifPresent(birthDay -> this.birthDay = birthDay);
        myPageRequest.gender().ifPresent(gender -> this.gender = gender);
        myPageRequest.petOwn().ifPresent(petOwn -> this.petOwn = petOwn);
        myPageRequest.profileImgUrl().ifPresent(profileImgUrl -> this.profileImgUrl = profileImgUrl);
        myPageRequest.introduction().ifPresent(introduction -> this.introduction = introduction);
        this.pet = pet.update(myPageRequest);

        return this;
    }
}
