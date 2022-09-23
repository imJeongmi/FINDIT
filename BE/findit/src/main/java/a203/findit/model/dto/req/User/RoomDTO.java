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
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Set;
import java.util.UUID;

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

    private HashMap<String, PlayerInfoDTO> playerInfoDTOBySessionId;

    public RoomDTO (Game game){
        this.roomId = game.getId();
        this.userId = game.getUser().getId();
        this.limitminute = game.getLimitMin();
    }
}