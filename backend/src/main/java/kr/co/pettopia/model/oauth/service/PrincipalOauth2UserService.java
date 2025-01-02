package kr.co.pettopia.model.oauth.service;

import java.util.Map;
import kr.co.pettopia.model.auth.PrincipalDetails;
import kr.co.pettopia.model.oauth.provider.GoogleUserInfo;
import kr.co.pettopia.model.oauth.provider.KakaoUserInfo;
import kr.co.pettopia.model.oauth.provider.NaverUserInfo;
import kr.co.pettopia.model.oauth.provider.OAuth2UserInfo;
import kr.co.pettopia.model.user.domain.Role;
import kr.co.pettopia.model.user.domain.Users;
import kr.co.pettopia.model.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("로드유저실해애애앵*********************************");
        System.out.println("로드유저실해애애앵*********************************");
        System.out.println("로드유저실해애애앵*********************************");
        System.out.println("로드유저실해애애앵*********************************");
        OAuth2User oAuth2User = super.loadUser(userRequest);

        OAuth2UserInfo oAuth2UserInfo = checkOauth2Provider(userRequest,oAuth2User);

        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String userId = provider + "_" + providerId;
        String email = oAuth2UserInfo.getEmail();
        String nickname = oAuth2UserInfo.getName();
        // 기본적으로 "USER" 권한 부여
        String role = Role.USER.getRole();
        if (email.equals("ywcsuwon@gmail.com")) {
            role = "ROLE_ADMIN";
        }

        Users users = createUser(provider,providerId,userId,email,nickname,role);

        return new PrincipalDetails(users, oAuth2User.getAttributes());
    }

    private OAuth2UserInfo checkOauth2Provider(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            return new GoogleUserInfo(oAuth2User.getAttributes());
        }
        if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            return new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
        }
        if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            return new KakaoUserInfo(oAuth2User.getAttributes());
        }
        return null;
    }

    private Users createUser(String provider, String providerId, String userId, String email, String nickname,
                             String role) {
        Users users = userRepository.findByUserId(userId);
        if (users == null) {
            users = Users.builder()
                    .userId(userId)
                    .provider(provider)
                    .providerId(providerId)
                    .email(email)
                    .nickname(nickname)
                    .role(role)
                    .build();
            userRepository.save(users);
        }
        return users;
    }

}
