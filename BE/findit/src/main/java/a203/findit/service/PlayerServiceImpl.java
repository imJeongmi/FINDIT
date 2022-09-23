package a203.findit.service;

import a203.findit.model.dto.req.User.PlayerEnterDTO;
import a203.findit.model.dto.req.User.PlayerInfoDTO;
import a203.findit.model.repository.memory.MemoryPlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlayerServiceImpl implements PlayerService {
    final private MemoryPlayerRepository playerRepository;

    public void join(PlayerEnterDTO playerEnterDTO, String sessionId){
        playerRepository.save(playerEnterDTO,sessionId);
    }
}
