package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import kr.co.pettopia.model.BaseEntity;
import kr.co.pettopia.model.user.dto.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.core.parameters.P;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

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

    @Column(name = "HAS_PET")
    private boolean hasPet;

    @Column(name = "PROFILE_IMG_URL")
    private String profileImgUrl;

    @Column(name = "INTRODUCTION")
    private String introduction;

    public User update(ProfileDTO profileDTO) {
        String nickname = profileDTO.nickname();

        validateNickname(nickname);

        this.nickname = nickname;
        this.profileImgUrl = profileDTO.profileImgUrl();
        uploadFile(profileDTO.profileImgBase64());
        this.introduction = profileDTO.introduction();
        this.hasPet = profileDTO.hasPet();

        return this;
    }

    private void validateNickname(String nickname) {
        if (nickname == null || nickname.isBlank()) {
            throw new IllegalArgumentException("닉네임은 필수 입력 값입니다.");
        }
    }

    private void uploadFile(String profileImgBase64) {
        if (profileImgBase64 != null) {
            try {
                // Base64로 인코딩된 이미지 디코딩
                byte[] imageBytes = Base64.getDecoder().decode(profileImgBase64);
                String uploadDir = "backend/src/main/resources/static/profileImages";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }
                String filePath = uploadDir + "/" + profileImgUrl.replace("profileImages/", "");
                // 디코딩된 이미지 파일 저장
                Files.write(Paths.get(filePath), imageBytes);
            } catch (IOException e) {
                throw new IllegalArgumentException("파일 저장 실패 : " + e.getMessage());
            }
        }
    }
}
