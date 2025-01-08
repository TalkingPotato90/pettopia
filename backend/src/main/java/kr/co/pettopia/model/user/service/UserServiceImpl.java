package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.pet.repository.PetRepository;
import kr.co.pettopia.model.user.domain.User;
import kr.co.pettopia.model.user.dto.UserInfoRequest;
import kr.co.pettopia.model.user.dto.UserInfoResponse;
import kr.co.pettopia.model.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PetRepository petRepository;

    @Override
    public UserInfoResponse getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId);
        Pet pet = user.getPet();

        if (pet != null) {
            return UserInfoResponse.from(user, pet);
        }

        return UserInfoResponse.from(user);
    }

    @Transactional
    @Override
    public UserInfoResponse updateUserInfo(String userId, UserInfoRequest userInfoRequest) {
        User user = userRepository.findByUserId(userId);
        return UserInfoResponse.from(user.update(userInfoRequest));
    }
}
