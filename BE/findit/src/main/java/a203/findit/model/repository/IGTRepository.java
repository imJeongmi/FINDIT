package a203.findit.model.repository;

import a203.findit.model.entity.IGT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IGTRepository extends JpaRepository<IGT, Long> {
}
