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

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
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
        game.setMode(mode);
        gameRepository.save(game);

        Long gameId = game.getId();
        Long nowmillisecond = now.atZone(ZoneId.of("UTC")).toInstant().toEpochMilli();
        String entercode = roomRepository.gameIdToCode(nowmillisecond - standardMillisecond, gameId);

        game.setEntercode(entercode);
        gameRepository.save(game);

        return roomRepository.save(entercode,game, mode);
    }
    public RoomDTO find(String entercode){
        return roomRepository.findByEnterCode(entercode);
    }

    @Transactional
    public void finish(String entercode){
        LocalDateTime now = LocalDateTime.now();
        //inmemory
        roomRepository.findByEnterCode(entercode).setEndTime(now);
        //DB
        Optional<Game> game = gameRepository.findByEnterCode(entercode);
        game.get().setEndTime(now);

        Duration duration = Duration.between(game.get().getStartTime(),now);
        game.get().setPlayTime(duration.getSeconds());
        gameRepository.save(game.get());
    }

    @Transactional
    public RoomDTO start(String entercode){
        LocalDateTime now= LocalDateTime.now();

        //DB
        Optional<Game> game = gameRepository.findByEnterCode(entercode);
        game.get().setStartTime(now);
        gameRepository.save(game.get());

        //inmemory
        roomRepository.findByEnterCode(entercode).setStartTime(now);
        return roomRepository.findByEnterCode(entercode);
    }
}
