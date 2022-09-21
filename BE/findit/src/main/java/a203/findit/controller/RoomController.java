package a203.findit.controller;

import a203.findit.model.dto.req.User.CreateRoomDTO;
import a203.findit.model.dto.res.ApiResponse;
import a203.findit.model.dto.res.RoomDTO;
import a203.findit.service.RoomServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final RoomServiceImpl roomService;

    @PostMapping("/create2")
    @ResponseBody
    public ApiResponse create2(){
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = user.getUsername();
        System.out.println("*****************: "+username);
        ApiResponse result = new ApiResponse();
        return result;
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@Valid @RequestBody CreateRoomDTO createRoomDTO){
        RoomDTO roomDTO = roomService.join(createRoomDTO.getUsername(), createRoomDTO.getMode(), createRoomDTO.getLimitminute());
        String entercode= roomDTO.getEnterCode();
        return ResponseEntity.ok(entercode);
    }

    @MessageMapping("/start")
    public void startSocket(String entercode){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("entercode",entercode);
        simpMessagingTemplate.convertAndSend("sub/room/"+entercode,jsonObject);

    }



}
