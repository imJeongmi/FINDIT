package a203.findit.model.repository;

import a203.findit.model.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findByUserId(Long UserId);

    Optional<Game> findById(Long id);


    @Query(nativeQuery = true, value = "select * from game where entercode = :entercode")
    Optional<Game> findByEnterCode(String entercode);

    @Query(nativeQuery = true, value = "select * from game a " +
            "join user b on a.user_id = b.user_id " +
            "where b.username = :username")
    ArrayList<Game> findAllByUsername(String username);

}