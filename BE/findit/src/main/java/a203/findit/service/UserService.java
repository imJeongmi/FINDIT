package a203.findit.service;


import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

public interface UserService {

    boolean createUser(CreateUserDTO createUserDTO);

    Map<String, String> login(@Valid LoginUserDTO loginUserDTO);

    boolean logout(HttpServletRequest req, String refreshToken);

    Map<String, String> userDetails(String userId);

    ResponseEntity updateForm(UpdateFormDTO updateFormDTO);

    ResponseEntity getImgList(MultipartFile img);

    ResponseEntity updateUser(String username);

    ResponseEntity deleteUser();

    ResponseEntity createTreasure();

    ResponseEntity getTreasure();

}
