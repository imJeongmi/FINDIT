package a203.findit.model.dto.req.User;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IGTDTO {
    List<Long> tids;
}
