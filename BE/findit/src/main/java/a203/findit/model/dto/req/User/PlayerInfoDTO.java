package a203.findit.model.dto.req.User;


import lombok.*;

import javax.servlet.http.HttpSession;
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
    private int score;
    private HttpSession sessionId;

    // sessionId, set of igtid
//    public Set<Integer> IGTIds;

    public PlayerInfoDTO(PlayerEnterDTO playerEnterDTO,HttpSession sessionId){
        this.profileImg = playerEnterDTO.getProfileImg();
        this.nickname = playerEnterDTO.getNickname();
        this.sessionId = sessionId;
    }
}