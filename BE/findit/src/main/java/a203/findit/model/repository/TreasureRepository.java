package a203.findit.model.repository;

import a203.findit.model.entity.Treasure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreasureRepository extends JpaRepository<Treasure, Long> {
}
