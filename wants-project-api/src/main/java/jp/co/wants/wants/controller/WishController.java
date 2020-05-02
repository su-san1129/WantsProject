package jp.co.wants.wants.controller;

import jp.co.wants.wants.ResourcePath;
import jp.co.wants.wants.domain.WishItem;
import jp.co.wants.wants.form.WishForm;
import jp.co.wants.wants.service.WishItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(ResourcePath.WISHES)
public class WishController {

    private final WishItemService wishItemService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WishItem saveWishes(@RequestBody WishForm wishForm) {
        return wishItemService.saveWishItem(wishForm.getUrl());
    }

}
