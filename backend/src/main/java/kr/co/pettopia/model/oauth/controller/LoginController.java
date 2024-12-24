package kr.co.pettopia.model.oauth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {

    @GetMapping("/oauth2/google/login")
    public @ResponseBody String OAuth2GoogleLogin() {
        return "구글로그인 테스트";
    }


}
