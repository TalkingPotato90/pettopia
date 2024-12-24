package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@EntityListeners(UserEntityListener.class)
@Table(name = "USERS")
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
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
    private char patOwn;

    @Column(name = "PROFILE_IMG_URL")
    private String profileImgUrl;

    @Column(name = "INTRODUCTION")
    private String introduction;
}
