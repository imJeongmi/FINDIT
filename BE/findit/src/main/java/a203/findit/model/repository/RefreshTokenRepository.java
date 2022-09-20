package a203.findit.model.repository;

import a203.findit.model.entity.auth.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    long deleteByValue(String value);

}
