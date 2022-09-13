package a203.findit.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "Item-Player")
public class ItemPlayer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_user_id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "treasure_id")
    private Treasure treasure;

}
