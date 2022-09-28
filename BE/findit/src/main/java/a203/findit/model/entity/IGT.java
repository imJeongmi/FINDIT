package a203.findit.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "igt")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
