package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.repository.FreeboardRepository;
import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.pet.repository.PetRepository;
import kr.co.pettopia.model.user.domain.User;
import kr.co.pettopia.model.user.dto.UserInfoRequest;
import kr.co.pettopia.model.user.dto.UserInfoResponse;
import kr.co.pettopia.model.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final FreeboardRepository freeboardRepository;

    @Override
    public UserInfoResponse getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId);
        Pet pet = petRepository.findByOwnerUserId(user.getUserId())
                .orElse(null);

        if (pet != null) {
            return UserInfoResponse.from(user, pet);
        }

        return UserInfoResponse.from(user);
    }

    @Transactional
    @Override
    public UserInfoResponse updateUserInfo(String userId, UserInfoRequest userInfoRequest) {
        User user = userRepository.findByUserId(userId);
        Pet pet = petRepository.findByOwnerUserId(user.getUserId())
                .orElse(null);

        if (pet == null) {
            if (!userInfoRequest.hasPet()) { // 변경 전: 반려동물 없음, 변경 후: 반려동물 없음
                return UserInfoResponse.from(user.update(userInfoRequest));
            }
            // 변경 전: 반려동물 없음, 변경 후: 반려동물 있음
            return UserInfoResponse.from(user.update(userInfoRequest), createPet(user, userInfoRequest));
        }

        if (!userInfoRequest.hasPet()) { // 변경 전: 반려동물 있음, 변경 후: 반려동물 없음
            petRepository.delete(pet);
            return UserInfoResponse.from(user.update(userInfoRequest));
        }

        // 변경 전: 반려동물 있음, 변경 후: 반려동물 있음
        return UserInfoResponse.from(user.update(userInfoRequest), pet.update(userInfoRequest));
    }

    private Pet createPet(User user, UserInfoRequest userInfoRequest) {
        Pet pet = Pet.builder()
                .owner(user)
                .name(userInfoRequest.petName())
                .birthday(userInfoRequest.petBirthday())
                .gender(userInfoRequest.petGender())
                .neutering(userInfoRequest.neutering())
                .build();

        petRepository.save(pet);
        return pet;
    }

    @Override
    public List<Post> getPosts(String userId) {
        User user = userRepository.findByUserId(userId);
        return freeboardRepository.findByUser(user);
    }
}
