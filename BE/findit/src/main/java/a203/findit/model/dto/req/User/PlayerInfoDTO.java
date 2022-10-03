package a203.findit.model.dto.req.User;


import lombok.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
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
    private String sessionId;
    private int rank;
    private String entercode;
    private int count;
    // sessionId, set of igtid
    public ArrayList<Long> IGTIds;

    public PlayerInfoDTO(PlayerEnterDTO playerEnterDTO,String sessionId){
        this.profileImg = playerEnterDTO.getProfileImg();
        this.nickname = playerEnterDTO.getNickname();
        this.entercode = playerEnterDTO.getEntercode();
        this.sessionId = sessionId;
        this.score = 0;
        this.IGTIds = new ArrayList<>();
        this.rank = 0;
        this.count = 0;
    }
}