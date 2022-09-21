package a203.findit.model.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class GameDTO {
    private String roomId;
    private Long userId;

    public GameDTO (String roomId,Long userId){
        this.roomId = roomId;
        this.userId = userId;
    }
}
