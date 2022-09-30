package a203.findit.model.repository;

import a203.findit.model.entity.Treasure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface TreasureRepository extends JpaRepository<Treasure, Long> {
    List<Treasure> findByIdIn(Collection<Long> ids);
}
