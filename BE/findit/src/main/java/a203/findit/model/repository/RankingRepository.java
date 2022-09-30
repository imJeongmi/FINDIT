package a203.findit.model.repository;

import a203.findit.model.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, Long> {

    @Query(nativeQuery = true, value = "select * from ranking where game_entercode = :entercode")
    List<Ranking> findByEntercode(String entercode);
}
