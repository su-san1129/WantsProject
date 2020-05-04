package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Data
@Builder
@Table("wish_items")
public class WishItem {
    @Id
    private int id;
    private String userId;
    private String name;
    private String price;
    private String salePrice;
    private String url;
    private String imagePath;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
