package a203.findit.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface GameService {


    Map<String, String> startGame(String roomId, String username);

    ResponseEntity getGameDetail(String roomId, String username);

    ResponseEntity findTreasure(String roomId, String username);

    ResponseEntity getRank(String roomId, String username);

    ResponseEntity getScores(String roomId, String username);
}
