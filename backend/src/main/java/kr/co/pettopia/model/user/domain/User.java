package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@EntityListeners(UserEntityListener.class)
@Table(name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", referencedColumnName = "ROLE_ID", foreignKey = @ForeignKey(name = "FK_ROLE_TO_USER"))
    private Role role;

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
