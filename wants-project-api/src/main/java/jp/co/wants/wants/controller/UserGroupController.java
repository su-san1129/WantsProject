package jp.co.wants.wants.controller;

import jp.co.wants.wants.ResourcePath;
import jp.co.wants.wants.domain.BelongsToGroupUsers;
import jp.co.wants.wants.domain.LoginUser;
import jp.co.wants.wants.form.UserGroupForm;
import jp.co.wants.wants.service.UserGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(ResourcePath.USER_GROUPS)
public class UserGroupController {

    private final UserGroupService userGroupService;

    @PostMapping
    public List<BelongsToGroupUsers> saveUserGroup(
            @RequestBody UserGroupForm userGroupForm,
            @AuthenticationPrincipal LoginUser loginUser) {
        return userGroupService.saveUserGroup(userGroupForm, loginUser.getUser().getUserId());
    }
}
