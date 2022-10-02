package a203.findit.model.dto.req.User;

import a203.findit.model.entity.Game;
import a203.findit.model.entity.Mode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.asm.Advice;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private Long userId;

    private LocalDateTime startTime;

    private int limitminute;

    private LocalDateTime endTime;

    private Mode mode;

    private String enterCode;

    public ArrayList<String> sessionIds;

    public HashMap<String, PlayerInfoDTO> playerInfoDTOBySessionId;
    
    public HashMap<Long, Set<String>> sessionIdByIGTID;

    public RoomDTO (Game game){
        this.roomId = game.getId();
        this.userId = game.getUser().getId();
        this.limitminute = game.getLimitMin();
        this.sessionIds = new ArrayList<>();
        this.playerInfoDTOBySessionId = new HashMap<>();
        this.sessionIdByIGTID = new HashMap<>();
    }
}