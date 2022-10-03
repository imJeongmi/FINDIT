package a203.findit.model.dto.req.User;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AfterFindDTO {
    private int plusscore;
    private int effect;
    private int finalscore;
    private int rank;
    private boolean FindAll;
}
