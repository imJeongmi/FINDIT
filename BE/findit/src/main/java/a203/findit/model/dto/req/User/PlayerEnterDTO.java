package a203.findit.model.dto.req.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlayerEnterDTO {
    private String entercode;
    private int profileImg;
    private String nickname;
}
