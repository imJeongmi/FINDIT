package a203.findit.controller;

import a203.findit.model.dto.res.GameDTO;
import a203.findit.model.socket.Message;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
    public void message(@Valid GameDTO gameDTO) throws InterruptedException {
        Thread.sleep(1000);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userId",gameDTO.getUserId());
        simpMessagingTemplate.convertAndSend("/sub/room/"+gameDTO.getRoomId(),jsonObject);
    }

}
