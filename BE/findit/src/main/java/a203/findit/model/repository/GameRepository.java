package a203.findit.model.repository;

import a203.findit.model.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findByUserId(Long UserId);

    Optional<Game> findById(Long id);

}