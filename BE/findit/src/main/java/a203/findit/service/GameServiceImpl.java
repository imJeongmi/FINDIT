package a203.findit.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class GameServiceImpl implements GameService{
    @Override
    public Map<String, String> startGame(String roomId, String username) {
        // 방 id가 'roomId'인 방 시작

        LocalDateTime now = LocalDateTime.now();


        return null;
    }

    @Override
    public ResponseEntity getGameDetail(String roomId, String username) {
        return null;
    }

    @Override
    public ResponseEntity findTreasure(String roomId, String username) {
        return null;
    }

    @Override
    public ResponseEntity getRank(String roomId, String username) {
        return null;
    }

    @Override
    public ResponseEntity getScores(String roomId, String username) {
        return null;
    }
}
