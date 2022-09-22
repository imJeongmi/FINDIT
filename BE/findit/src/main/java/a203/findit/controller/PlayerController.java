package a203.findit.controller;

import a203.findit.model.dto.req.User.EntercodeDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class PlayerController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/enter")
    public void socketEnter(@Valid EntercodeDTO entercodeDTO, @Valid String sessionId){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("player",sessionId);
        simpMessagingTemplate.convertAndSend("/sub/room/"+entercodeDTO.getEntercode(),jsonObject);
    }
    @MessageMapping("/enter")
    public void findAll(@Valid EntercodeDTO entercodeDTO, @Valid String sessionId){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("player",sessionId);
        simpMessagingTemplate.convertAndSend("/sub/private/"+entercodeDTO.getEntercode(),jsonObject);
    }

}
