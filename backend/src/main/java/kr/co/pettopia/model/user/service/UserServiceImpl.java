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

        if (user.isHasPet() && userInfoRequest.hasPet()) {
            Pet pet = petRepository.findByOwnerUserId(user.getUserId())
                    .orElse(null);

            return UserInfoResponse.from(user.update(userInfoRequest), pet.update(userInfoRequest));
        }

        if (user.isHasPet() && !userInfoRequest.hasPet()) {
            Pet pet = petRepository.findByOwnerUserId(user.getUserId())
                    .orElse(null);

            petRepository.delete(pet);
            return UserInfoResponse.from(user.update(userInfoRequest));
        }

        if (!userInfoRequest.hasPet()) {
            return UserInfoResponse.from(user.update(userInfoRequest));
        }

        return UserInfoResponse.from(user.update(userInfoRequest), createPet(user, userInfoRequest));
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
}
