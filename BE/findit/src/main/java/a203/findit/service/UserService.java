package a203.findit.service;


import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

public interface UserService {

    boolean createUser(CreateUserDTO createUserDTO);

    Map<String, String> login(@Valid LoginUserDTO loginUserDTO);

    boolean logout(HttpServletRequest req, String refreshToken);

    Map<String, String> userDetails(String userId);

    Map<String, Object> updateForm(UpdateFormDTO nickname);

    boolean updateImg(Long userId, String img);

    boolean updatePw(Long userId, String pw, String username);

    boolean deleteUser(Long userId);

    boolean createTreasure(String username, String treasureName, Long gameId, MultipartFile img);

    boolean createTreasure(String username, String treasureName, MultipartFile img);

    List<String> getTreasure();

    boolean selectTreasure(List<Long> tid, String entercode);


}
