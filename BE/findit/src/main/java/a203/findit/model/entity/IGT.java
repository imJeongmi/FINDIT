package a203.findit.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "igt")
public class IGT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "igt_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "treasure_id")
    private Treasure treasure;
}
