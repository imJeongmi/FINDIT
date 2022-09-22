package a203.findit.controller;

import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.ApiResponse;
import a203.findit.service.UserService;
import a203.findit.util.SetCookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    private final String ACCESS_TOKEN_KEY = "accessToken";
    private final String REFRESH_TOKEN_KEY = "refreshToken";

    @PostMapping("")
    public ResponseEntity createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {
        boolean result = userService.createUser(createUserDTO);
        if(result){
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(HttpServletRequest request, HttpServletResponse response, @Valid @RequestBody LoginUserDTO loginUserDTO) {
        Map<String, String> result = userService.login(loginUserDTO);
        SetCookie.setRefreshTokenCookie(response, result.get(REFRESH_TOKEN_KEY));
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/logout")
    @Transactional
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();

        String refreshToken = "";

        if(cookies!=null){
            for (Cookie c : cookies) {
                if(c.getName().equals(REFRESH_TOKEN_KEY)){
                    refreshToken = c.getValue().trim();
                    break;
                }
            }
        }

        userService.logout(request,refreshToken);

        SetCookie.deleteRefreshTokenCookie(response);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity getDetails(@PathVariable("userId") String userId) {
        Map<String, String> result = userService.userDetails(userId);
        return null;
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
        UserDetails currUser = (UserDetails) (SecurityContextHolder.getContext().getAuthentication()).getDetails();

        return userService.updateUser(currUser.getUsername());
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
