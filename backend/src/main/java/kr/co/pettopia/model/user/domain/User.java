package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import kr.co.pettopia.model.BaseEntity;
import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.user.dto.UserInfoRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    @Column(name = "NICKNAME", length = 100, nullable = false)
    private String nickname;

    @Column(name = "BIRTHDAY")
    private LocalDate birthDay;

    @Column(name = "GENDER")
    private char gender;

    @Column(name = "HAS_PET")
    private boolean hasPet;

    @Column(name = "PROFILE_IMG_URL")
    private String profileImgUrl;

    @Column(name = "INTRODUCTION")
    private String introduction;

    @OneToOne(mappedBy = "owner", optional = true)
    private Pet pet;

    public User update(UserInfoRequest userInfoRequest) {
        String nickname = userInfoRequest.nickname();

        validateNickname(nickname);

        this.nickname = nickname;
        this.birthDay = userInfoRequest.birthday();
        this.gender = userInfoRequest.gender();
        this.profileImgUrl = userInfoRequest.profileImgUrl();
        this.introduction = userInfoRequest.introduction();
        this.hasPet = userInfoRequest.hasPet();

        if (hasPet) {
//            this.pet = pet.update();
        }

        return this;
    }

    private void validateNickname(String nickname) {
        if (nickname == null || nickname.isBlank()) {
            throw new IllegalArgumentException("닉네임은 필수 입력 값입니다.");
        }
    }
}
