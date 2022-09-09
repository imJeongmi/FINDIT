package a203.findit.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "InGameTreasure")
public class IGT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "in_game_treasure_id")
    private Long id;

}
