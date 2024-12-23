package kr.co.pettopia.model.freeboard.service;

import kr.co.pettopia.model.freeboard.dto.PostDTO;

import java.util.List;

public interface FreeboardService {
    List<PostDTO> getAllPosts();
}
