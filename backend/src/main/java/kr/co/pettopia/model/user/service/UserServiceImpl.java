package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.user.domain.Pet;
import kr.co.pettopia.model.user.domain.Users;
import kr.co.pettopia.model.user.dto.MyPageDTO;
import kr.co.pettopia.model.user.repository.PetRepository;
import kr.co.pettopia.model.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PetRepository petRepository;

    @Override
    public MyPageDTO getUserInfo(String userId) {
        Optional<Users> user = userRepository.findById(userId);
        Pet pet = petRepository.findByUsers(user.orElseThrow());
        return MyPageDTO.from(user.orElseThrow(), pet);
    }
}
