package a203.findit.controller;

import a203.findit.exception.CustomException;
import a203.findit.model.dto.req.ReqSelectTreasure;
import a203.findit.model.dto.req.ReqUpdateImgDTO;
import a203.findit.model.dto.req.ReqUpdatePwDTO;
import a203.findit.model.dto.req.User.CreateUserDTO;
import a203.findit.model.dto.req.User.LoginUserDTO;
import a203.findit.model.dto.req.User.UpdateFormDTO;
import a203.findit.model.dto.res.Code;
import a203.findit.service.RoomServiceImpl;
import a203.findit.service.UserService;
import a203.findit.util.SetCookie;
import lombok.RequiredArgsConstructor;
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
    private final RoomServiceImpl roomService;

    private final String ACCESS_TOKEN_KEY = "accessToken";
    private final String REFRESH_TOKEN_KEY = "refreshToken";

    //    @CrossOrigin("*") // 모든 요청에 접근 허용
    @PostMapping("")
    public ResponseEntity createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {

        try {
            userService.createUser(createUserDTO);

        } catch (CustomException customException) {
            if (customException.getCode() == Code.C402) {
                return ResponseEntity.badRequest().body("중복입니다.");
            }
        }
        return ResponseEntity.ok().body("생성완료");
    }

    @PostMapping("/login")
    public ResponseEntity login(HttpServletRequest request, HttpServletResponse response, @Valid @RequestBody LoginUserDTO loginUserDTO) {
        try {
            Map<String, String> result = userService.login(loginUserDTO);
            SetCookie.setRefreshTokenCookie(response, result.get(REFRESH_TOKEN_KEY));
            return ResponseEntity.ok().body(result);
        } catch (CustomException customException) {
            if (customException.getCode() == Code.C401) {
                return ResponseEntity.badRequest().body("인증에 실패했습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("로그인에 실패하였습니다.");
        }
        return ResponseEntity.internalServerError().body("서버 에러");

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

        return ResponseEntity.ok().body("로그아웃되었습니다.");
    }

    @GetMapping("/{userId}")
    public ResponseEntity getDetails(@PathVariable("userId") String userId) {
        return ResponseEntity.ok().body(userService.userDetails(userId));
    }

    @GetMapping("/updateForm")
    public ResponseEntity<Map<String, Object>> getUpdateForm(@RequestBody UpdateFormDTO updateFormDTO) {
        return ResponseEntity.ok().body(userService.updateForm(updateFormDTO));
    }

    @PostMapping("/{userId}/update")
    public ResponseEntity updateImg(@PathVariable("userId") String userId, @RequestBody ReqUpdateImgDTO reqUpdateImgDTO) {
        System.out.println(reqUpdateImgDTO.getImg());

            return ResponseEntity.ok().body(userService.update(userId, reqUpdateImgDTO.getNickname(), reqUpdateImgDTO.getImg()));
    }

    @PostMapping("/{userId}/updatePw")
    public ResponseEntity updatePw(@PathVariable("userId") Long userId, @RequestBody ReqUpdatePwDTO reqUpdatePwDTO) {
        UserDetails currUser = (UserDetails) (SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        System.out.println(reqUpdatePwDTO.getPw());
        System.out.println(currUser.getUsername());
        if (userService.updatePw(userId, reqUpdatePwDTO.getPw(), currUser.getUsername())) {
            return ResponseEntity.ok().body("변경되었습니다.");
        }
        return ResponseEntity.badRequest().body("잘못된 요청입니다.");
    }

    @PostMapping("/{userId}/delete")
    public ResponseEntity deleteUser(@PathVariable("userId") Long userId) {
        if (userService.deleteUser(userId)) {
            return ResponseEntity.ok().body("삭제되었습니다.");
        }
        return ResponseEntity.badRequest().body("잘못된 요청입니다.");
    }

    @PostMapping("/treasures/add")
    public ResponseEntity createTreasure(@RequestPart(value = "img") MultipartFile img) {
        UserDetails currUser = (UserDetails) (SecurityContextHolder.getContext().getAuthentication()).getPrincipal();

        if (userService.createTreasure(currUser.getUsername(), img)) {
            return ResponseEntity.ok().body("생성되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("잘못된 요청입니다.");
        }

    }

    @GetMapping("/treasures")
    public ResponseEntity getTreasures() {
        return ResponseEntity.ok(userService.getTreasure());
    }

    @PostMapping("/treasures")
    public ResponseEntity selectTreasure(@RequestBody ReqSelectTreasure reqSelectTreasure) {
        reqSelectTreasure.getTid().stream().forEach(System.out::println);
        System.out.println(reqSelectTreasure.getEntercode());
        if (userService.selectTreasure(reqSelectTreasure.getTid(), reqSelectTreasure.getEntercode())) {
            roomService.addIgtInmemory(reqSelectTreasure.getTid(), reqSelectTreasure.getEntercode());
            return ResponseEntity.ok().body("선택완료");
        }
        return ResponseEntity.badRequest().body("선택실패");
    }

}
