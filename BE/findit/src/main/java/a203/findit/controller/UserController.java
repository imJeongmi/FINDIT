package a203.findit.controller;

import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.ApiResponse;
import a203.findit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ResponseEntity createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {
        return userService.createUser(createUserDTO);
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginUserDTO loginUserDTO) {
        return userService.login(loginUserDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity logout() {
        return userService.logout();
    }

    @GetMapping("/{userId}")
    public ResponseEntity getDetails(@PathVariable("userId") String userId) {
        return userService.userDetails(userId);
    }

    @GetMapping("/updateForm")
    public ResponseEntity getUpdateForm(@RequestBody UpdateFormDTO updateFormDTO) {
        return userService.updateForm(updateFormDTO);
    }

    @GetMapping("/imgList")
    public ResponseEntity getImgList(MultipartFile img) {
        return userService.getImgList(img);
    }

    @PostMapping("/{userId}/update")
    public ResponseEntity updateUser(@PathVariable("userId") String userId) {
        return userService.updateUser();
    }

    @PostMapping("/{userId}/delete")
    public ResponseEntity deleteUser(@PathVariable("userId") String userId) {
        return userService.deleteUser();
    }

    @PostMapping("/treasures")
    public ResponseEntity createTreasure(MultipartFile img) {
        return userService.createTreasure();
    }

    @GetMapping("/treasures")
    public ResponseEntity getTreasures() {
        return userService.getTreasure();
    }

}
