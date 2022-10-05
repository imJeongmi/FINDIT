package a203.findit.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ranking_id")
    private Long id;

    private String game_entercode;

    private String player_nickname;

    private int player_score;

    private int player_rank;

    private int player_profileImg;
}
