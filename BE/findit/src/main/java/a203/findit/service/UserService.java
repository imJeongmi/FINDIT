package a203.findit.service;


import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

public interface UserService {

    boolean createUser(CreateUserDTO createUserDTO);

    Map<String, String> login(@Valid LoginUserDTO loginUserDTO);

    boolean logout(HttpServletRequest req, String refreshToken);

    Map<String, String> userDetails(String userId);

    Map<String, Object> updateForm(UpdateFormDTO nickname);

    boolean updateImg(Long userId, String img);

    ResponseEntity updatePw(String username);

    boolean deleteUser(Long userId);

    ResponseEntity createTreasure();

    ResponseEntity getTreasure();


}
