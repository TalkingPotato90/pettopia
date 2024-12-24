package kr.co.pettopia.model.user.domain;

import jakarta.persistence.PrePersist;

public class UserEntityListener {

    @PrePersist
    public void beforePersist(Users users) {
        if (users.getUserId() == null) {
            users.setUserId(generateUserId(users.getProvider(), users.getProviderId()));
        }
    }

    private String generateUserId(String provider, String providerId) {
        return String.join("_", provider, providerId);
    }
}
