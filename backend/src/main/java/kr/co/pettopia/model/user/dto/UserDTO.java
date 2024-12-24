package kr.co.pettopia.model.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private String userId;
    private String role;
    private String providerId ;
    private String provider ;
    private String email;
    private String nickname; // google_100355441559385471085

    public UserDTO(String userId, String role, String providerId, String provider, String email, String nickname) {
        this.userId = userId;
        this.role = role;
        this.providerId = providerId;
        this.provider = provider;
        this.email = email;
        this.nickname = nickname;
    }

}

