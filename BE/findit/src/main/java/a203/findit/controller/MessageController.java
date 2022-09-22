package a203.findit.controller;

import a203.findit.model.dto.req.User.EntercodeDTO;
import a203.findit.model.dto.req.User.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
    public void message(@Valid MessageDTO MessageDTO) throws InterruptedException {
        Thread.sleep(1000);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("roomId",MessageDTO.getRoomId());
        simpMessagingTemplate.convertAndSend("/sub/room/"+MessageDTO.getRoomId(),jsonObject);
    }
    @MessageMapping("/hello2")
    public void message2(@Valid EntercodeDTO entercodeDTO) throws InterruptedException {
//        Thread.sleep(1000);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("roomId",entercodeDTO.getEntercode());
        simpMessagingTemplate.convertAndSend("/sub/room/"+entercodeDTO.getEntercode(),jsonObject);
    }

}
