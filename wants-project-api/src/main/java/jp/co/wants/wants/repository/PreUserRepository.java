package jp.co.wants.wants.repository;

import jp.co.wants.wants.domain.PreUser;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PreUserRepository extends CrudRepository<PreUser, Integer> {
    @Query("SELECT * FROM pre_users WHERE mail_address = :mailAddress")
    Optional<PreUser> findByMailAddress(@Param("mailAddress") String mailAddress);

    @Query("SELECT * FROM pre_users WHERE user_id = :userId")
    Optional<PreUser> findByUserId(@Param("userId") String userId);

    @Query("DELETE FROM pre_users WHERE user_id = :userId")
    @Modifying
    void deleteByUserId(@Param("userId") String userId);
}
