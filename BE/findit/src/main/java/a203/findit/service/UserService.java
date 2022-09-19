package a203.findit.service;


import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

public interface UserService {

    ResponseEntity createUser(CreateUserDTO createUserDTO);

    ResponseEntity login(@Valid LoginUserDTO loginUserDTO);

    ResponseEntity logout();

    ResponseEntity userDetails(String userId);

    ResponseEntity updateForm(UpdateFormDTO updateFormDTO);

    ResponseEntity getImgList(MultipartFile img);

    ResponseEntity updateUser();

    ResponseEntity deleteUser();

    ResponseEntity createTreasure();

    ResponseEntity getTreasure();

}
