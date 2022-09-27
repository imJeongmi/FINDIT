package a203.findit.model.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @Column(name="limit_min")
    private int limitMin;

    @Column(name="end_time")
    private int endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
