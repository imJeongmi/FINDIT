package a203.findit.service;

import a203.findit.model.dto.req.User.RoomDTO;
import a203.findit.model.entity.Game;
import a203.findit.model.entity.Mode;
import a203.findit.model.entity.User;
import a203.findit.model.repository.GameRepository;
import a203.findit.model.repository.UserRepository;
import a203.findit.model.repository.MemoryRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomServiceImpl implements RoomService{

    static Long standardMillisecond = LocalDateTime.of(2022, 9, 21, 13, 00, 00).atZone(ZoneId.of("UTC")).toInstant().toEpochMilli();
    //public static ArrayList<RoomDTO> roomDTOs = new ArrayList<RoomDTO>();
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final MemoryRoomRepository roomRepository;


    @Transactional
    public RoomDTO join(String username, Mode mode, int limitMinute){
        Optional<User> user = userRepository.findByUsername(username);
        Long userId = user.get().getId();

        Game game = new Game();
        game.setUser(user.get());
        game.setLimitMin(limitMinute);
        LocalDateTime now = LocalDateTime.now();
        game.setCreateTime(now);
        gameRepository.save(game);

        Long gameId = game.getId();
        Long nowmillisecond = now.atZone(ZoneId.of("UTC")).toInstant().toEpochMilli();
        String entercode = roomRepository.gameIdToCode(nowmillisecond - standardMillisecond, gameId);

        return roomRepository.save(entercode,game, mode);
    }
    public RoomDTO find(String entercode){
        return roomRepository.findByEnterCode(entercode);
    }
}
