package a203.findit.model.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "score")
    @ColumnDefault("0")
    private Integer score;

    @Column(name = "ranking")
    private Integer ranking;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "icon_id")
    private Icon icon;

    protected Player(){
    }

    private Player(Builder builder){
        this.nickname = builder.nickname;
        this.score = builder.score;
        this.ranking = builder.rank;
    }

    public static class Builder {
        private final String nickname;
        private final Integer score;
        private final Integer rank;

        public Builder(String nickname, Integer score, Integer rank){
            this.nickname = nickname;
            this.score = score;
            this.rank = rank;
        }

        public Player build(){
            return new Player(this);
        }
    }
}
