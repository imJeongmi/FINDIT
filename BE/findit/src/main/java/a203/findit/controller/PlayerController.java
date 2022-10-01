package a203.findit.controller;

import a203.findit.model.dto.req.User.*;
import a203.findit.service.PlayerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class PlayerController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PlayerServiceImpl playerService;

    @MessageMapping("/enter")
    public void socketEnter(@Valid PlayerEnterDTO playerEnterDTO, @Header("simpSessionId") String sessionId){
        JSONObject jsonObject = new JSONObject();
        //join playerinfo
        playerService.join(playerEnterDTO,sessionId);
        jsonObject.put("code", "success");
        jsonObject.put("status","waiting");
        jsonObject.put("playerid",sessionId);
        jsonObject.put("nickname",playerEnterDTO.getNickname());
        simpMessagingTemplate.convertAndSend("/sub/room/"+playerEnterDTO.getEntercode(),jsonObject);
    }
//    @MessageMapping("/private")
//    // 다 푼사람 private 구독한 사람(방장) 한테만 보내주기
//    public void privateInfo(@Valid EntercodeDTO entercodeDTO, @Header("simpSessionId") String sessionId){
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("code", "success");
//        jsonObject.put("status","progress");
//        jsonObject.put("playerid",sessionId);
//        simpMessagingTemplate.convertAndSend("/sub/private/"+entercodeDTO.getEntercode(),jsonObject);
//    }

    //igt 구현시 inmemory 재설정 및 테스트 해보기
    @MessageMapping("/find")
    public void find(@Header("simpSessionId") String sessionId, @Valid BeforeFindDTO beforeFindDTO){
        AfterFindDTO afterFindDTO= playerService.findTreasure(beforeFindDTO,sessionId);
        JSONObject jsonObject = new JSONObject();
        // 얻은 점수, 효과, 최종점수
        jsonObject.put("code", "success");
        jsonObject.put("status","progress");
        jsonObject.put("plusscore", afterFindDTO.getPlusscore());
        jsonObject.put("effectIndex", afterFindDTO.getEffect());
        jsonObject.put("finalscore", afterFindDTO.getFinalscore());
        simpMessagingTemplate.convertAndSend("/sub/player/" + sessionId,jsonObject);

        ArrayList<PlayerInfoDTO> playersRank = playerService.rankChange(beforeFindDTO.getEntercode());
        JSONArray rankJson = new JSONArray();
        for (PlayerInfoDTO playerInfoDTO : playersRank) {
            JSONObject temp = new JSONObject();
            jsonObject.put("code", "success");
            jsonObject.put("status","progress");
            temp.put("profileImg", playerInfoDTO.getProfileImg());
            temp.put("nickname", playerInfoDTO.getNickname());
            temp.put("score", playerInfoDTO.getScore());
            temp.put("sessionId", playerInfoDTO.getSessionId());
            rankJson.add(temp);
        }
        simpMessagingTemplate.convertAndSend("/sub/room/"+beforeFindDTO.getEntercode(),rankJson);

        //크기 비교해서 다 찾은 사람 있는지 확인하고 있으면 IF

        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("code", "success");
        jsonObject1.put("status","progress");
        jsonObject1.put("playerid",sessionId);
        simpMessagingTemplate.convertAndSend("/sub/private/"+beforeFindDTO.getEntercode(),jsonObject1);

    }

    @GetMapping("/room/{entercode}")
    public ResponseEntity ValidRoomId(@PathVariable("entercode") String entercode, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(playerService.valid(entercode)){
            return ResponseEntity.status(HttpStatus.OK).body(session.getId());
        }else{
            return ResponseEntity.badRequest().body("존재하지 않는 입장코드입니다.");
        }
    }

}
