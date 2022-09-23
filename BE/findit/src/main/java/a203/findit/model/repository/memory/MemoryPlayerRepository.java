package a203.findit.model.repository.memory;

import a203.findit.model.dto.req.User.PlayerInfoDTO;
import a203.findit.model.repository.PlayerRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemoryPlayerRepository implements PlayerRepository {

    final private MemoryRoomRepository roomRepository;

    private PlayerInfoDTO findPlayerInfoDTO(String entercode, String sessionId){

    }

}
