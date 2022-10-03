package a203.findit.controller;

import a203.findit.model.dto.req.User.*;
import a203.findit.model.entity.User;
import a203.findit.service.PlayerServiceImpl;
import ch.qos.logback.core.net.SyslogOutputStream;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class PlayerController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PlayerServiceImpl playerService;

    @MessageMapping("/enter")
    public void socketEnter(String playerEnter, @Header("simpSessionId") String sessionId){
        //join playerinfo
        String[] strlist = playerEnter.split(",");

        String entercode = strlist[0];
        int profileImg = Integer.parseInt(strlist[1]);
        String nickname = strlist[2];

        PlayerEnterDTO playerEnterDTO = new PlayerEnterDTO();
        playerEnterDTO.setEntercode(entercode);
        playerEnterDTO.setProfileImg(profileImg);
        playerEnterDTO.setNickname(nickname);

        playerService.join(playerEnterDTO,sessionId);

        JSONArray jsonArray = new JSONArray();
        List<PlayerInfoDTO> playerInfoDTOS = playerService.findAll(playerEnterDTO.getEntercode());
        System.out.println(playerInfoDTOS.size());
        for(PlayerInfoDTO playerInfoDTO : playerInfoDTOS){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("nickname",playerInfoDTO.getNickname());
            jsonObject.put("sessionId",playerInfoDTO.getSessionId());
            jsonObject.put("profileImg",playerInfoDTO.getProfileImg());
            jsonArray.add(jsonObject);
        }
//        simpMessagingTemplate.convertAndSend("/sub/room/"+entercode,test);
        simpMessagingTemplate.convertAndSend("/sub/room/"+entercode,jsonArray);

    }

    //igt 구현시 inmemory 재설정 및 테스트 해보기
    @MessageMapping("/find")
    public void find(@Header("simpSessionId") String sessionId, String BeforeFind){
        String[] strlist = BeforeFind.split(",");
        String entercode = strlist[0];
        Long treasureId = Long.parseLong(strlist[1]);

        BeforeFindDTO beforeFindDTO = new BeforeFindDTO();
        beforeFindDTO.setEntercode(entercode);
        beforeFindDTO.setTreasureId(treasureId);

        AfterFindDTO afterFindDTO= playerService.findTreasure(beforeFindDTO,sessionId);
        JSONObject jsonObject = new JSONObject();
        // 얻은 점수, 효과, 최종점수
        jsonObject.put("plusscore", afterFindDTO.getPlusscore());
        jsonObject.put("effectIndex", afterFindDTO.getEffect());
        jsonObject.put("finalscore", afterFindDTO.getFinalscore());
        simpMessagingTemplate.convertAndSend("/sub/player/" + sessionId,jsonObject);

        ArrayList<PlayerInfoDTO> players = playerService.rankChange(entercode);
        JSONArray rankJson = new JSONArray();
        for( PlayerInfoDTO playerInfoDTO : players ){
            JSONObject temp = new JSONObject();
            temp.put("rank", playerInfoDTO.getRank());
            temp.put("profileImg", playerInfoDTO.getProfileImg());
            temp.put("nickname", playerInfoDTO.getNickname());
            temp.put("score", playerInfoDTO.getScore());
            temp.put("sessionId", playerInfoDTO.getSessionId());
            rankJson.add(temp);
        }
        simpMessagingTemplate.convertAndSend("/sub/rank/"+entercode,rankJson);

        //크기 비교해서 다 찾은 사람 있는지 확인하고 있으면 IF
        if(afterFindDTO.isFindAll()) {
            JSONObject enableButton = new JSONObject();
            enableButton.put("sessionId", sessionId);
            simpMessagingTemplate.convertAndSend("/sub/private/" + entercode, enableButton);
        }

    }

    @GetMapping("/room/{entercode}")
    public ResponseEntity ValidRoomId(@PathVariable("entercode") String entercode) {
        if(playerService.valid(entercode)){
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }else{
            return ResponseEntity.badRequest().body("존재하지 않는 입장코드입니다.");
        }
    }


}
