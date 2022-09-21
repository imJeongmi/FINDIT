package a203.findit.model.dto.req.User;

import a203.findit.model.entity.Mode;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoomDTO {
    private String username;
    private Mode mode;
    private int limitminute;
}
