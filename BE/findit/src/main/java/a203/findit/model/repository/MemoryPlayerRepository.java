package a203.findit.model.repository;

import a203.findit.model.dto.req.User.PlayerEnterDTO;
import a203.findit.model.dto.req.User.PlayerInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class MemoryPlayerRepository implements PlayerRepository {
    final private MemoryRoomRepository roomRepository;

    private PlayerInfoDTO findPlayerInfoDTO(String entercode, String sessionId){
        return roomRepository.findByEnterCode(entercode).getPlayerInfoDTOBySessionId().get(sessionId);
    }

    public PlayerInfoDTO save(PlayerEnterDTO playerEnterDTO, String sessionId){
        PlayerInfoDTO playerInfoDTO = new PlayerInfoDTO(playerEnterDTO);

        roomRepository.findByEnterCode(playerEnterDTO.getEntercode()).playerInfoDTOBySessionId.put(sessionId,playerInfoDTO);
        return playerInfoDTO;
    }

}
