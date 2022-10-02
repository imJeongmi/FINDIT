package a203.findit.controller;

import a203.findit.model.dto.req.User.EntercodeDTO;
import a203.findit.model.dto.req.User.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
    public void message(String str) throws InterruptedException {
        Thread.sleep(1000);
        String[] strlist = str.split(",");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("roomId1",strlist[0]);
        jsonObject.put("roomId2",strlist[1]);
        jsonObject.put("roomId3",strlist[2]);
        simpMessagingTemplate.convertAndSend("/sub/room/"+strlist[0],jsonObject);
    }
    @MessageMapping("/hello2")
    public void message2(@Valid EntercodeDTO entercodeDTO) throws InterruptedException {
//        Thread.sleep(1000);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("roomId",entercodeDTO.getEntercode());
        simpMessagingTemplate.convertAndSend("/sub/room/"+entercodeDTO.getEntercode(),jsonObject);
    }

}