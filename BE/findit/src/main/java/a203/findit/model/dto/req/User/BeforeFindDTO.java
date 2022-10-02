package a203.findit.model.dto.req.User;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BeforeFindDTO {
    private String entercode;
    private Long treasureId;
}
