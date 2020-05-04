package jp.co.wants.wants.service;

import jp.co.wants.wants.domain.WishItem;
import jp.co.wants.wants.form.WishForm;
import jp.co.wants.wants.repository.WishItemRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class WishItemService {

    private final WishItemRepository wishItemRepository;

    public WishItem analysisWishItem(String url) {
        Document document = null;
        try {
            document = Jsoup.connect(url).get();
            final Optional<String> salePrice = Optional.ofNullable(document.select("#priceblock_saleprice").text());
            final Optional<String> price = Optional.ofNullable(document.select("#priceblock_ourprice").text());
            final Optional<String> productTitle = Optional.ofNullable(document.select("#productTitle").text());
            final Optional<Elements> img = Optional.ofNullable(document.select("#imgTagWrapperId img"));
            final int imgStrStart = img.toString().indexOf("data-old-hires=\"https://images-na");
            final int imgStrEnd = img.toString().indexOf("onload=");
            String subStrImg = null;
            if (!(imgStrStart == -1 || imgStrEnd == -1) && img.isPresent()) {
                subStrImg = img.get().toString().substring(imgStrStart+7, imgStrEnd-11);
            }
            return WishItem.builder()
                    .name(productTitle.get())
                    .price(price.get())
                    .salePrice(salePrice.get())
                    .imagePath( subStrImg != null ? subStrImg : "")
                    .url(url)
                    .build();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void saveWishItem(String userId, WishForm itemForm) {
        final var build = WishItem.builder()
                .userId(userId)
                .price(itemForm.getPrice())
                .salePrice(itemForm.getSalePrice())
                .url(itemForm.getUrl())
                .imagePath(itemForm.getImagePath())
                .name(itemForm.getName())
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        wishItemRepository.save(build);
    }

    public List<WishItem> getWishItemByUserId(String userId){
        return wishItemRepository.findAllByUserId(userId);
    }
}
