package a203.findit.controller;

import a203.findit.model.dto.req.User.CreateRoomDTO;
import a203.findit.model.dto.req.User.EntercodeDTO;
import a203.findit.model.dto.req.User.PlayerInfoDTO;
import a203.findit.model.dto.res.ApiResponse;
import a203.findit.model.dto.req.User.RoomDTO;
import a203.findit.model.entity.Ranking;
import a203.findit.model.entity.User;
import a203.findit.service.PlayerServiceImpl;
import a203.findit.service.RankingServiceImpl;
import a203.findit.service.RoomServiceImpl;
import a203.findit.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class RoomController {
    /*
    user 가 방 create, entercode, 방 시작
     */
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final RoomServiceImpl roomService;
    private final UserServiceImpl userService;
    private final PlayerServiceImpl playerService;
    private final RankingServiceImpl rankingService;

    @PostMapping("/room/create2")
    @ResponseBody
    public ApiResponse create2(){
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = user.getUsername();
        System.out.println("*****************: "+username);
        ApiResponse result = new ApiResponse();
        return result;
    }

    @PostMapping("/room/create")
    public ResponseEntity<String> create(@Valid @RequestBody CreateRoomDTO createRoomDTO){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = principal.getUsername();

        RoomDTO roomDTO = roomService.join(username, createRoomDTO.getMode(), createRoomDTO.getLimitminute());
        String entercode= roomDTO.getEnterCode();
        return ResponseEntity.ok(entercode);
    }

    @MessageMapping("/open")
    public void socketOpen(@Valid EntercodeDTO entercodeDTO) {
        JSONObject jsonObject = new JSONObject();
        RoomDTO roomDTO = roomService.find(entercodeDTO.getEntercode());
        if(roomDTO == null) {
            jsonObject.put("code", "no such entercode");
        }
        else if(roomDTO.getEndTime()!= null){
            jsonObject.put("code", "expired room");
        }else{
            jsonObject.put("code", "success");
            jsonObject.put("status","ready");
            jsonObject.put("mode",roomDTO.getMode());
            Optional<User> user = userService.findByUserId(roomDTO.getUserId());
            jsonObject.put("username",user.get().getUsername());
            jsonObject.put("limitminute",roomDTO.getLimitminute());
            //userid
            jsonObject.put("room",roomDTO.getRoomId());
        }
        simpMessagingTemplate.convertAndSend("/sub/room/"+entercodeDTO.getEntercode(),jsonObject);
    }

    @MessageMapping("/gamestart")
    public void gameStart(@Valid EntercodeDTO entercodeDTO){
        JSONObject jsonObject = new JSONObject();
        RoomDTO roomDTO = roomService.start(entercodeDTO.getEntercode());
//        RoomDTO roomDTO = roomService.find(entercodeDTO.getEntercode());
//        roomDTO.setStartTime(LocalDateTime.now());
        jsonObject.put("code", "success");
        jsonObject.put("status","start");
        jsonObject.put("mode",roomDTO.getMode());
        jsonObject.put("limitminute",roomDTO.getLimitminute());
        jsonObject.put("starttime",roomDTO.getStartTime());
        jsonObject.put("room",roomDTO.getRoomId());
        simpMessagingTemplate.convertAndSend("/sub/room/"+entercodeDTO.getEntercode(),jsonObject);
    }

    @MessageMapping("finish")
    public void gameFinish(@Valid EntercodeDTO entercodeDTO){
        JSONObject jsonObject = new JSONObject();
        roomService.finish(entercodeDTO.getEntercode());
        jsonObject.put("code", "success");
        jsonObject.put("status","end");
        simpMessagingTemplate.convertAndSend("/sub/room/"+entercodeDTO.getEntercode(),jsonObject);
    }

    @PostMapping("/room/result")
    public ResponseEntity sendResult(@Valid EntercodeDTO entercodeDTO){
        //return result && save result >> 등수
        ArrayList<PlayerInfoDTO> playerInfoDTOS =  playerService.rankChange(entercodeDTO.getEntercode());
        rankingService.join(playerInfoDTOS,entercodeDTO.getEntercode());
        return ResponseEntity.ok(playerInfoDTOS);
    }

    @GetMapping("/room/result")
    public ResponseEntity<ArrayList<Ranking>> showResult(@Valid EntercodeDTO entercodeDTO){
        //return result && save result >> 등수
        ArrayList<Ranking> rankings = rankingService.show(entercodeDTO.getEntercode());
        return ResponseEntity.ok(rankings);
    }
}