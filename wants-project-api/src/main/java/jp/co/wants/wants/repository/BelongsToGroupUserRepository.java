package jp.co.wants.wants.repository;

import jp.co.wants.wants.domain.BelongsToGroupUsers;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BelongsToGroupUserRepository extends CrudRepository<BelongsToGroupUsers, Integer> {
    @Query("SELECT * FROM belongs_to_group_users WHERE user_id = :userId")
    List<BelongsToGroupUsers> findAllByUserId(@Param("userId") final String userId);

    @Query("SELECT * FROM belongs_to_group_users WHERE user_group_id = :userGroupId")
    List<BelongsToGroupUsers> findAllByGroupId(@Param("userGroupId") final Integer userGroupId);
}
