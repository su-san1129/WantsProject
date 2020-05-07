package jp.co.wants.wants.repository;

import jp.co.wants.wants.domain.BelongsToGroupUsers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BelongsToGroupUserRepository extends CrudRepository<BelongsToGroupUsers, Integer> {
}
