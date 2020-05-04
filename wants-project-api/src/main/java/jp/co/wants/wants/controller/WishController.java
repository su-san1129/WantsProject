package jp.co.wants.wants.controller;

import jp.co.wants.wants.ResourcePath;
import jp.co.wants.wants.domain.LoginUser;
import jp.co.wants.wants.domain.WishItem;
import jp.co.wants.wants.form.WishForm;
import jp.co.wants.wants.service.WishItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(ResourcePath.WISHES)
public class WishController {

    private final WishItemService wishItemService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WishItem getWishes(@RequestBody WishForm wishForm) {
        return wishItemService.analysisWishItem(wishForm.getUrl());
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveWishes(@RequestBody WishForm wishForm, @AuthenticationPrincipal LoginUser loginUser) {
        wishItemService.saveWishItem(loginUser.getUser().getUserId(), wishForm);
    }

    @GetMapping
    public List<WishItem> getWishItems(@AuthenticationPrincipal LoginUser loginUser) {
        return wishItemService.getWishItemByUserId(loginUser.getUser().getUserId());
    }

}
