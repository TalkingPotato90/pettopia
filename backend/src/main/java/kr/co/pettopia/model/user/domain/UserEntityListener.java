package kr.co.pettopia.model.user.domain;

import jakarta.persistence.PrePersist;

public class UserEntityListener {

    @PrePersist
    public void beforePersist(User user) {
        if (user.getUserId() == null) {
            user.setUserId(generateUserId(user.getProvider(), user.getProviderId()));
        }
    }

    private String generateUserId(String provider, String providerId) {
        return String.join("_", provider, providerId);
    }
}
