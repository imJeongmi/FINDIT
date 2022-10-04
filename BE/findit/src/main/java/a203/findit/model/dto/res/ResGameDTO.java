package a203.findit.model.dto.res;

import a203.findit.model.entity.Mode;
import a203.findit.model.entity.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.lang.Nullable;

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

    @Nullable
    private LocalDateTime startTime;

    @Nullable
    private int limitMin;

    @Nullable
    private LocalDateTime endTime;

    @Nullable
    private Mode mode;

    private String entercode;

    @Nullable
    private Long playTime;
}
