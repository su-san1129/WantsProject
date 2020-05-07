package jp.co.wants.wants.repository;

import jp.co.wants.wants.domain.UserGroup;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserGroupRepository extends CrudRepository<UserGroup, Integer> {
}
