package a203.findit.model.dto.req.User;

public class CreateUserDTO {
    //    @Size(min = 4, max = 12)
    private String id;
    //    @Size(min = 4, max = 12)
    private String pw;
    private String nickname;

    public CreateUserDTO() {
    }

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
