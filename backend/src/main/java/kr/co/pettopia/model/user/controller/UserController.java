package kr.co.pettopia.model.user.controller;

import kr.co.pettopia.model.auth.PrincipalDetails;
import kr.co.pettopia.model.user.dto.MyPageDTO;
import kr.co.pettopia.model.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;

    @GetMapping("/mypage/main")
    public ResponseEntity<MyPageDTO> getUserById(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("==================================");
        System.out.println(principalDetails.getAttributes().get("sub")); // 나중에 id 빼오는거 확인

        return ResponseEntity.ok(userService.getUserInfo(String.valueOf(principalDetails.getAttributes().get("sub"))));
    }
}
