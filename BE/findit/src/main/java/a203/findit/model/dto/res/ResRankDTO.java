package a203.findit.model.dto.res;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResRankDTO {
    private String game_entercode;
    private String player_nickname;
    private int player_icon;
    private int player_score;
    private int player_rank;
}