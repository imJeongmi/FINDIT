package a203.findit.model.dto.req.User;

import lombok.*;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlayerEnterDTO {
    private String entercode;
    private int profileImg;
    private String nickname;
}
