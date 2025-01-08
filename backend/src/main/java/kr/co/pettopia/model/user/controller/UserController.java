package kr.co.pettopia.model.user.controller;

import kr.co.pettopia.model.auth.PrincipalDetails;
import kr.co.pettopia.model.user.dto.UserInfoRequest;
import kr.co.pettopia.model.user.dto.UserInfoResponse;
import kr.co.pettopia.model.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/info")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserInfoResponse> getUserById(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        System.out.println(principalDetails.getId()); // 로그인 구현 후 확인 필요

        return ResponseEntity.ok(userService.getUserInfo("NAVER_12345"));
//        return ResponseEntity.ok(userService.getUserInfo("KAKAO_12345"));
    }

    @PatchMapping
    public ResponseEntity<UserInfoResponse> updateUserInfo(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                           @RequestBody UserInfoRequest userInfoRequest) {
        return ResponseEntity.ok(userService.updateUserInfo("KAKAO_12345", userInfoRequest));
    }
}
