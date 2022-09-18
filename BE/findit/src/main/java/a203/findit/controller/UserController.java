package a203.findit.controller;

import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.ApiResponse;
import a203.findit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ApiResponse createUser(@Valid @RequestBody CreateUserDTO createUserDTO){
        return userService.createUser(createUserDTO);
    }

    @PostMapping("/login")
    public ApiResponse login(@Valid @RequestBody LoginUserDTO loginUserDTO){
        return userService.login(loginUserDTO);
    }

    @PostMapping("/logout")
    public ApiResponse logout(){
        return userService.logout();
    }

    @GetMapping("/{userId}")
    public ApiResponse getDetails(@PathVariable("userId") String userId){
        return userService.userDetails(userId);
    }

    @GetMapping("/updateForm")
    public ApiResponse getUpdateForm(@RequestBody UpdateFormDTO updateFormDTO){
        return userService.updateForm(updateFormDTO);
    }

    @GetMapping("/imgList")
    public ApiResponse getImgList(MultipartFile img){
        return userService.getImgList(img);
    }

    @PostMapping("/{userId}/update")
    public ApiResponse updateUser(@PathVariable("userId") String userId){
        return userService.updateUser();
    }

    @PostMapping("/{userId}/delete")
    public ApiResponse deleteUser(@PathVariable("userId") String userId){
        return userService.deleteUser();
    }

    @PostMapping("/treasures")
    public ApiResponse createTreasure(MultipartFile img){
        return userService.createTreasure();
    }

    @GetMapping("/treasures")
    public ApiResponse getTreasures(){
        return userService.getTreasure();
    }

}
