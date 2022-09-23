package a203.findit.model.repository.memory;

import a203.findit.model.dto.req.User.PlayerEnterDTO;
import a203.findit.model.dto.req.User.PlayerInfoDTO;
import a203.findit.model.dto.req.User.RoomDTO;
import a203.findit.model.entity.Player;
import a203.findit.model.repository.PlayerRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;

@RequiredArgsConstructor
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
