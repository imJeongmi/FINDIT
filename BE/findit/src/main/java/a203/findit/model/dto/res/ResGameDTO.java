package a203.findit.model.dto.res;

import a203.findit.model.entity.Mode;
import a203.findit.model.entity.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGameDTO {
    private LocalDateTime createTime;

    private LocalDateTime startTime;

    private int limitMin;

    private LocalDateTime endTime;

    private Mode mode;

    private String entercode;

    private User user;

    private long playTime;
}
