package a203.findit.model.dto.req.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO {
    //    @Size(min = 4, max = 12)
    private String id;
    //    @Size(min = 4, max = 12)
    private String pw;
    private String nickname;

    public String getId() {
        return id;
    }

    public String getPw() {
        return pw;
    }

    public String getNickname() {
        return nickname;
    }
}
