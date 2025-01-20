package kr.co.pettopia.model.user.controller;

import kr.co.pettopia.model.auth.PrincipalDetails;
import kr.co.pettopia.model.user.domain.Profile;
import kr.co.pettopia.model.user.dto.ProfileDTO;
import kr.co.pettopia.model.user.dto.ProfileRequest;
import kr.co.pettopia.model.user.dto.ProfileResponse;
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
    public ResponseEntity<ProfileResponse> getProfile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Profile profile = userService.getUserInfo(principalDetails.getId());

        return ResponseEntity.ok(ProfileResponse.from(profile));
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                         @RequestBody ProfileRequest profileRequest) {
        Profile profile = userService.updateUserInfo(principalDetails.getId(), ProfileDTO.of(profileRequest));

        return ResponseEntity.ok(ProfileResponse.from(profile));
    }

    @GetMapping("/posts")
    public ResponseEntity<List<UserPostsResponse>> getPostsByUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<UserPostsResponse> userPosts = userService.getPosts(principalDetails.getId())
                .stream()
                .map(UserPostsResponse::from)
                .toList();

        return ResponseEntity.ok(userPosts);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<UserPostsResponse>> getCommentsByUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<UserPostsResponse> userPostsOfComments = userService.getPostsOfComments(principalDetails.getId())
                .stream()
                .map(UserPostsResponse::from)
                .toList();

        return ResponseEntity.ok(userPostsOfComments);
    }
}
