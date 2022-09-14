package a203.findit.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("room")
public class RoomController {

    @PostMapping("create")
    @ResponseBody
    public long createRoom(@RequestHeader(value="Authorization") String token){
        //token 처리 -> user식별자 받기
        return 1;
    }
}
