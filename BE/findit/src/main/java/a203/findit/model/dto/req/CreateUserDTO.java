package a203.findit.model.dto.req;

import javax.validation.constraints.Size;

public class CreateUserDTO {
//    @Size(min = 4, max = 12)
    private String id;
//    @Size(min = 4, max = 12)
    private String pw;

    public String getId() {
        return id;
    }

    public String getPw() {
        return pw;
    }
}
