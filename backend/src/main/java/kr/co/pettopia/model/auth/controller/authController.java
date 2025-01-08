package kr.co.pettopia.model.auth.controller;

import java.util.HashMap;
import java.util.Map;
import kr.co.pettopia.model.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class authController {

    @GetMapping("/me")
    public Map<String,Object> getLoginUserInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, Object> response = new HashMap<>();

        if (principalDetails != null) {
            response.put("isLoggedIn", true); // 로그인 여부
            response.put("userName", principalDetails.getName()); // 사용자 이름
            response.put("userId", principalDetails.getId()); // 사용자 ID
            response.put("nickname", principalDetails.getName()); // 사용자 닉네임
            response.put("email", principalDetails.getAttributes().get("email")); // OAuth2 사용자 정보에서 이메일
            response.put("attributes", principalDetails.getAttributes()); // 모든 OAuth2 속성 포함 (필요한 경우)
        } else {
            response.put("isLoggedIn", false); // 로그인되지 않은 경우
            response.put("userName", ""); // 사용자 이름 빈 값
            response.put("message", "No authenticated user found");
        }

        return response;
    }
}
