package a203.findit.controller;

import a203.findit.model.dto.res.ApiResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("room")
public class RoomController {

    @PostMapping("create")
    @ResponseBody
    public ApiResponse createRoom(){
        //token 처리 -> user식별자 받기
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = user.getUsername();
        System.out.println("*****************: "+username);
        ApiResponse result = new ApiResponse();
//        result.
        return result;
    }
}
