package a203.findit.service;


import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.ResTreasureDTO;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

public interface UserService {

    boolean createUser(CreateUserDTO createUserDTO);

    Map<String, String> login(@Valid LoginUserDTO loginUserDTO);

    boolean logout(HttpServletRequest req, String refreshToken);

    Map<String, Object> userDetails(String userId);

    Map<String, Object> updateForm(UpdateFormDTO nickname);

    Map<String, Object> update(String userId, String nickname, Long img);

    boolean updatePw(Long userId, String pw, String username);

    boolean deleteUser(Long userId);


    boolean createTreasure(String username, MultipartFile img);

    List<ResTreasureDTO> getTreasure();

    boolean selectTreasure(List<Long> tid, String entercode);


}
