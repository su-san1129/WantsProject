package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.sql.Timestamp;

@Data
@Builder
public class WishItem {
    @Id
    private int id;
    private String name;
    private String price;
    private String salePrice;
    private String url;
    private String imagePath;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
