package a203.findit.controller;

import a203.findit.model.socket.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/hello")
    public void message(Message message){
        simpMessageSendingOperations.convertAndSend("/sub/channel/" + message.getChannelId(), message);
        
    }
}
