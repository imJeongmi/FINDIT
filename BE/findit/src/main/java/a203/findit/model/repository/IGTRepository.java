package a203.findit.model.repository;

import a203.findit.model.entity.IGT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGTRepository extends JpaRepository<IGT, Long> {

    boolean existsByTreasureIdAndGameId(Long treasureId, Long gameId);
    @Query(nativeQuery = true, value = "select * from where igt where game_id = :gameId")
    public List<IGT> findAllByGameId(Long gameId);
}
