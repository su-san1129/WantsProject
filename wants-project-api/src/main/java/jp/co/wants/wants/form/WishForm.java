package jp.co.wants.wants.form;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class WishForm {
    private int id;
    private String userId;
    private String name;
    private Integer price;
    private Integer salePrice;
    private String url;
    private String imagePath;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
