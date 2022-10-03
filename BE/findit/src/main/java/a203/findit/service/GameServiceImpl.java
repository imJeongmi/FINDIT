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

    public Game find(String entercode){
        return gameRepository.findByEnterCode(entercode).orElseGet(null);
    }
}
