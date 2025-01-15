package kr.co.pettopia.model.user.controller;

import kr.co.pettopia.model.auth.PrincipalDetails;
import kr.co.pettopia.model.user.dto.UserInfoRequest;
import kr.co.pettopia.model.user.dto.UserInfoResponse;
import kr.co.pettopia.model.user.dto.UserPostsResponse;
import kr.co.pettopia.model.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/info")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserInfoResponse> getUserById(@AuthenticationPrincipal PrincipalDetails principalDetails) {

        return ResponseEntity.ok(userService.getUserInfo(principalDetails.getId()));
//        return ResponseEntity.ok(userService.getUserInfo("NAVER_12345"));
//        return ResponseEntity.ok(userService.getUserInfo("KAKAO_12345"));
//        return ResponseEntity.ok(userService.getUserInfo("GOOGLE_12345"));
    }

    @PutMapping
    public ResponseEntity<UserInfoResponse> updateUserInfo(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                           @RequestBody UserInfoRequest userInfoRequest) {
        return ResponseEntity.ok(userService.updateUserInfo(principalDetails.getId(), userInfoRequest));
    }

    @GetMapping("/posts")
    public ResponseEntity<List<UserPostsResponse>> getPostsByUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<UserPostsResponse> userPosts = userService.getPosts(principalDetails.getId())
                .stream()
                .map(UserPostsResponse::from)
                .toList();

        return ResponseEntity.ok(userPosts);
    }
}
