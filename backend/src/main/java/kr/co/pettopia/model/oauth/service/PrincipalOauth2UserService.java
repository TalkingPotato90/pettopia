package kr.co.pettopia.model.oauth.service;

import kr.co.pettopia.model.auth.PrincipalDetails;
import kr.co.pettopia.model.user.domain.Role;
import kr.co.pettopia.model.user.domain.Users;
import kr.co.pettopia.model.user.dto.UserDTO;
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

    //구글로부터 받은 userReauest 데이터에 대한 후처리 되는 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("OAuth2UserRequest: " + userRequest);

        System.out.println("getAttributes : " + oAuth2User.getAttributes());
        System.out.println("++++++++++++++++++++++++++++++++++++");
        System.out.println("++++++++++++++++++++++++++++++++++++");
        System.out.println("++++++++++++++++++++++++++++++++++++");
        System.out.println("++++++++++++++++++++++++++++++++++++");
        System.out.println("++++++++++++++++++++++++++++++++++++");
        String provider = userRequest.getClientRegistration().getClientId();  // 예: google
        String providerId = oAuth2User.getAttribute("sub");  // 구글에서 제공하는 고유 ID
        String userId = provider + "_" + providerId;
        String email = oAuth2User.getAttribute("email");
        String nickname = oAuth2User.getAttribute("name");

        System.out.println("provider = " + provider);
        System.out.println("providerId = " + providerId);

        // 기본적으로 "USER" 권한 부여
        String role = Role.USER.getRole();
        if (email.equals("ywcsuwon@gmail.com")) {
            role = "ROLE_ADMIN";
        }

        UserDTO userDTO = new UserDTO(userId, role,providerId, provider, email, nickname);

        Users users = userRepository.findByUserId(userId);
        if (users == null) {
            // 새로운 사용자를 생성 후 저장
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
        return new PrincipalDetails(users, oAuth2User.getAttributes());
    }

}
