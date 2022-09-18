package a203.findit.model.repository;


import a203.findit.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
