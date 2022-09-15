package a203.findit.controller;

import a203.findit.exception.CustomException;
import a203.findit.model.dto.req.CreateUserDTO;
import a203.findit.model.dto.res.ApiResponse;
import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.User;
import a203.findit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ApiResponse createUser(@Valid @RequestBody CreateUserDTO createUserDTO){
        return userService.createUser(createUserDTO);
    }


}
