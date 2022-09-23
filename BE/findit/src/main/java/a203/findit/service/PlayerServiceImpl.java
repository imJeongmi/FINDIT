package a203.findit.service;

import a203.findit.model.dto.req.User.PlayerEnterDTO;
import a203.findit.model.dto.req.User.PlayerInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlayerServiceImpl implements PlayerService {
    public static ArrayList<PlayerInfoDTO> playerInfoDTOS = new ArrayList<PlayerInfoDTO>();

    public void join(PlayerEnterDTO playerEnterDTO, String sessionId){
        PlayerInfoDTO playerInfoDTO = new PlayerInfoDTO(playerEnterDTO);
        playerInfoDTO.setSessionId(sessionId);
        playerInfoDTOS.add(playerInfoDTO);
    }
}
