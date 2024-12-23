package kr.co.pettopia.model.oauth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {

    @GetMapping("/oauth/google/login")
    public @ResponseBody String OAuth2GoogleLogin() {
        System.out.println("매핑확인");
        return "구글로그인 테스트";
    }
}
