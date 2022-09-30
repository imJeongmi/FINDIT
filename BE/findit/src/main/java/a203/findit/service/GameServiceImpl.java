package a203.findit.service;

import a203.findit.model.entity.Game;
import a203.findit.model.repository.GameRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class GameServiceImpl implements GameService{
    private final GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

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

    public Game find(String entercode){
        return gameRepository.findByEnterCode(entercode).orElseGet(null);
    }
}
