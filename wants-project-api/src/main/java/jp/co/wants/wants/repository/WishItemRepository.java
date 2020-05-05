package jp.co.wants.wants.repository;

import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.domain.WishItem;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishItemRepository extends CrudRepository<WishItem, Integer> {

    @Query("SELECT * FROM wish_items WHERE user_id = :userId")
    List<WishItem> findAllByUserId(@Param("userId") String userId);
}
