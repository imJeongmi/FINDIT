package a203.findit.controller;

import a203.findit.model.dto.req.User.EntercodeDTO;
import a203.findit.model.dto.req.User.PlayerEnterDTO;
import a203.findit.service.PlayerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class PlayerController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PlayerServiceImpl playerService;

    @MessageMapping("/enter")
    public void socketEnter(@Valid PlayerEnterDTO playerEnterDTO, @Header("simpSessionId") String sessionId){
        JSONObject jsonObject = new JSONObject();
        //join playerinfo
        playerService.join(playerEnterDTO,sessionId);
        jsonObject.put("playerid",sessionId);
        jsonObject.put("nickname",playerEnterDTO.getNickname());
        simpMessagingTemplate.convertAndSend("/sub/room/"+playerEnterDTO.getEntercode(),jsonObject);
    }
    @MessageMapping("/private")
    // 다 푼사람 private 구독한 사람(방장) 한테만 보내주기
    public void findAll(@Valid EntercodeDTO entercodeDTO, @Header("simpSessionId") String sessionId){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("playerid",sessionId);
        simpMessagingTemplate.convertAndSend("/sub/private/"+entercodeDTO.getEntercode(),jsonObject);
    }




}
