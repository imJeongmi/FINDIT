package a203.findit.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "IGT_Player")
public class IgtPlayer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "igt_player_id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "treasure_id")
    private Treasure treasure;

}
