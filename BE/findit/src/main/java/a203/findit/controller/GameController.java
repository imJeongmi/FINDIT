package a203.findit.controller;

import a203.findit.model.dto.res.ApiResponse;
import a203.findit.model.dto.res.Code;
import a203.findit.model.entity.Game;
import a203.findit.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
@CrossOrigin
public class GameController {

    private final GameService gameService;

    @GetMapping("/test")
    public ApiResponse test() {
        ApiResponse result = new ApiResponse();
        result.setCode(200);
        result.setCodeMsg(Code.C200);
        result.setMessage("Success");
        return result;
    }

    @PostMapping("/{roomId}/start")
    public ResponseEntity startGame(@PathVariable("roomId") String roomId) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, String> result = gameService.startGame(roomId, principal.getUsername());
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity getGameDetail(@PathVariable("roomId") String roomId) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return gameService.getGameDetail(roomId, principal.getUsername());
    }

    @PostMapping("/{roomId}/find")
    public ResponseEntity findTreasure(@PathVariable("roomId") String roomId) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return gameService.findTreasure(roomId, principal.getUsername());
    }

    @GetMapping("/{roomId}/rank")
    public ResponseEntity getRank(@PathVariable("roomId") String roomId){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return gameService.getRank(roomId, principal.getUsername());
    }

    @GetMapping("/{roomId}/score")
    public ResponseEntity getScores(@PathVariable("roomId") String roomId){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return gameService.getScores(roomId, principal.getUsername());
    }


}
