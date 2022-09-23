package a203.findit.service;

import a203.findit.model.dto.res.RoomDTO;
import a203.findit.model.entity.Game;
import a203.findit.model.entity.Mode;
import a203.findit.model.entity.User;
import a203.findit.model.repository.GameRepository;
import a203.findit.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomServiceImpl implements RoomService{

    static Long standardMillisecond = LocalDateTime.of(2022, 9, 21, 13, 00, 00).atZone(ZoneId.of("UTC")).toInstant().toEpochMilli();
    public static ArrayList<RoomDTO> roomDTOs = new ArrayList<RoomDTO>();
    private final UserRepository userRepository;
    private final GameRepository gameRepository;


    public static String gameIdToCode(Long v, Long id) {
        String ret="";
        String time = Long.toString(v);
        String gid = Long.toString(id);

        int timeLen = time.length();
        while(gid.length() < 3){
            gid='0'+gid;
        }

        for(int i=0;i<3;i++) {
            String temp = String.valueOf(time.charAt(timeLen-i-1)) + String.valueOf(gid.charAt(i));
            ret+=temp;
        }

        return ret;
    }

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
        String entercode = gameIdToCode(nowmillisecond - standardMillisecond, gameId);

        RoomDTO roomDTO = new RoomDTO(game);
        roomDTO.setMode(mode);
        roomDTO.setEnterCode(entercode);

        roomDTOs.add(roomDTO);

        return roomDTO;
    }
}
