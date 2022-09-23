package a203.findit.model.dto.req.User;


import lombok.*;

import java.util.HashMap;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlayerInfoDTO {
    private int profileImg;
    private String nickname;
    private Long score;

    // sessionId, set of igtid
    Set<Long> IGTIds;

    public PlayerInfoDTO(PlayerEnterDTO playerEnterDTO){
        this.profileImg = playerEnterDTO.getProfileImg();
        this.nickname = playerEnterDTO.getNickname();
    }
}