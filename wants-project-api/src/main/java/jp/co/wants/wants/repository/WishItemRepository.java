package jp.co.wants.wants.repository;

import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.domain.WishItem;
import org.springframework.data.repository.CrudRepository;

public interface WishItemRepository extends CrudRepository<WishItem, Integer> {
}
