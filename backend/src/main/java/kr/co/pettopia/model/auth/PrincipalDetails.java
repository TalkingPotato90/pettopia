package kr.co.pettopia.model.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import kr.co.pettopia.model.user.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class PrincipalDetails implements OAuth2User {

    private User user;
    private Map<String,Object> attributes;

    public PrincipalDetails(User user, Map<String,Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();

        collect.add(new SimpleGrantedAuthority(user.getRole()));

        return collect;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return user.getNickname();
    }

    public String getId() {
        return user.getUserId();
    }
}
