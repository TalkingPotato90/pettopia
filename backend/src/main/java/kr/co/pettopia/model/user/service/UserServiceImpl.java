package kr.co.pettopia.model.user.service;

import kr.co.pettopia.model.freeboard.domain.Comment;
import kr.co.pettopia.model.freeboard.domain.Post;
import kr.co.pettopia.model.freeboard.repository.CommentRepository;
import kr.co.pettopia.model.freeboard.repository.FreeboardRepository;
import kr.co.pettopia.model.pet.domain.Pet;
import kr.co.pettopia.model.pet.repository.PetRepository;
import kr.co.pettopia.model.user.domain.Profile;
import kr.co.pettopia.model.user.domain.User;
import kr.co.pettopia.model.user.dto.ProfileDTO;
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
    private final CommentRepository commentRepository;

    @Override
    public Profile getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId);
        Pet pet = petRepository.findByOwnerUserId(user.getUserId())
                .orElse(null);

        return Profile.of(user, pet);
    }

    @Transactional
    @Override
    public Profile updateUserInfo(String userId, ProfileDTO profileDTO) {
        User user = userRepository.findByUserId(userId);
        Pet pet = petRepository.findByOwnerUserId(userId).orElse(null);

        Profile profile = Profile.of(user, pet);
        Profile updatedProfile = profile.update(profileDTO);

        if (pet != null && !profileDTO.hasPet()) {
            petRepository.delete(pet);
        }

        if (pet == null && profileDTO.hasPet()) {
            petRepository.save(updatedProfile.getPet());
        }

        return updatedProfile;
    }

    @Override
    public List<Post> getPosts(String userId) {
        User user = userRepository.findByUserId(userId);
        return freeboardRepository.findByUser(user);
    }

    @Override
    public List<Post> getPostsOfComments(String userId) {
        User user = userRepository.findByUserId(userId);
        List<Comment> comments = commentRepository.findByUser(user);

        return comments.stream()
                .map(Comment::getPost)
                .distinct()
                .toList();
    }
}
