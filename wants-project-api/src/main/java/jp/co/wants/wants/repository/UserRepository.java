package jp.co.wants.wants.repository;

import jp.co.wants.wants.domain.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    @Query("SELECT * FROM users WHERE mail_address = :mailAddress")
    Optional<User> findByMailAddress(@Param("mailAddress") String mailAddress);
}
