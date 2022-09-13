package a203.findit.model.entity;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name="create_time", updatable = false)
    @CreatedDate
    private LocalDateTime createTime;

    @Column(name="start_time")
    private LocalDateTime startTime;

    @Column(name="end_time")
    private LocalDateTime endTime;

    @Column(name="limit_time")
    private LocalDateTime limitTime;

    @Column(name = "mode")
    private Mode mode;

    @Column(name = "enter_code")
    private String enterCode;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status")
    private Status status;

    @Column(name = "player_cnt")
    private Integer playerCnt;

    @Column(name = "treasure_cnt")
    private Integer treasureCnt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User chief;

}
