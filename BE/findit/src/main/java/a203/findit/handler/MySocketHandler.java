package a203.findit.handler;

import org.json.simple.JSONObject;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class MySocketHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
    //연결 정보 담는 객체
    @Override
    public void afterConnectionEstablished(WebSocketSession session){
        sessions.add(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        String payload= message.getPayload();
        JSONObject jsonObject = new JSONObject(payload);
        for(WebSocketSession s : sessions){
            s.sendMessage(new TextMessage("Hi" + jsonObject.get("user")+ "! How may I help you?"));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        sessions.remove(session);
    }

}