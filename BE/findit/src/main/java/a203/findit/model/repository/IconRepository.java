package a203.findit.model.repository;

import a203.findit.model.entity.Icon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IconRepository extends JpaRepository<Icon, Long> {
    Optional<Icon> findByImageUrl(String imageUrl);
}
