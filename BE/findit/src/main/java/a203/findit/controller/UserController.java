package a203.findit.controller;

import a203.findit.exception.CustomException;
import a203.findit.model.dto.req.ReqCreateTreasureDTO;
import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.Code;
import a203.findit.service.UserService;
import a203.findit.util.AwsService;
import a203.findit.util.SetCookie;
import lombok.RequiredArgsConstructor;
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
import java.util.HashMap;
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
        try {
            userService.createUser(createUserDTO);

        } catch (CustomException customException) {
            if (customException.getCode() == Code.C402) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(HttpServletRequest request, HttpServletResponse response, @Valid @RequestBody LoginUserDTO loginUserDTO) {
        Map<String, String> result = userService.login(loginUserDTO);
        SetCookie.setRefreshTokenCookie(response, result.get(REFRESH_TOKEN_KEY));
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/logout")
    @Transactional
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();

        String refreshToken = "";

        if (cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equals(REFRESH_TOKEN_KEY)) {
                    refreshToken = c.getValue().trim();
                    break;
                }
            }
        }

        userService.logout(request, refreshToken);

        SetCookie.deleteRefreshTokenCookie(response);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, String>> getDetails(@PathVariable("userId") String userId) {
        return ResponseEntity.ok().body(userService.userDetails(userId));
    }

    @GetMapping("/updateForm")
    public ResponseEntity<Map<String, Object>> getUpdateForm(@RequestBody UpdateFormDTO updateFormDTO) {
        Map<String, Object> result = new HashMap<>();
        userService.updateForm(updateFormDTO);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/{userId}/updateImg")
    public ResponseEntity updateImg(@PathVariable("userId") Long userId, String img) {
        if (userService.updateImg(userId, img)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/{userId}/updatePw")
    public ResponseEntity updatePw(@PathVariable("userId") Long userId, String pw) {
        UserDetails currUser = (UserDetails) (SecurityContextHolder.getContext().getAuthentication()).getDetails();
        if (userService.updatePw(userId, pw, currUser.getUsername())) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/{userId}/delete")
    public ResponseEntity deleteUser(@PathVariable("userId") Long userId) {
        if (userService.deleteUser(userId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/treasures")
    public ResponseEntity createTreasure(@RequestPart ReqCreateTreasureDTO reqCreateTreasureDTO, @RequestPart MultipartFile img) {
        UserDetails currUser = (UserDetails) (SecurityContextHolder.getContext().getAuthentication()).getDetails();
        if (userService.createTreasure(currUser.getUsername(), reqCreateTreasureDTO.getTreasureName(), reqCreateTreasureDTO.getRoomId(), img)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/treasures")
    public ResponseEntity getTreasures() {
        return ResponseEntity.ok(userService.getTreasure());
    }

}
