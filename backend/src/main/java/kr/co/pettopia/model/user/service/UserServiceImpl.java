package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.user.domain.User;
import kr.co.pettopia.model.user.dto.MyPageRequest;
import kr.co.pettopia.model.user.dto.MyPageResponse;
import kr.co.pettopia.model.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public MyPageResponse getUserInfo(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return MyPageResponse.from(user.orElseThrow(() -> new IllegalArgumentException("not found user")));
    }

    @Transactional
    @Override
    public MyPageResponse updateUserInfo(String userId, MyPageRequest myPageRequest) {
        User user = userRepository.findByUserId(userId);
        return MyPageResponse.from(user.update(myPageRequest));
    }
}
