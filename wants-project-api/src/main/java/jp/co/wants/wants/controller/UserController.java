package jp.co.wants.wants.controller;

import jp.co.wants.wants.ResourceNotFoundException;
import jp.co.wants.wants.ResourcePath;
import jp.co.wants.wants.domain.PreUser;
import jp.co.wants.wants.form.LoginForm;
import jp.co.wants.wants.form.RegisterForm;
import jp.co.wants.wants.form.RegisterPreUserForm;
import jp.co.wants.wants.form.ValidateIdForm;
import jp.co.wants.wants.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Base64;

@RestController
@RequestMapping(ResourcePath.USERS)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void login(@RequestBody LoginForm loginForm) {
        System.out.println(loginForm);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterForm registerForm) {
        userService.save(registerForm);
    }

    @PostMapping("/register/main_registration")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerMainRegistration(@RequestBody ValidateIdForm validateIdForm) {
        final String decodeUrl = new String(Base64.getUrlDecoder().decode(validateIdForm.getValidateId()));
        try {
            userService.checkUserId(decodeUrl);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register/main_registration/pre_user")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerPreUser(@RequestBody RegisterPreUserForm registerForm) {
        userService.savePreUser(registerForm);
    }

    @GetMapping("/pre_user/{id}")
    public PreUser getPreUser(@PathVariable("id") final String id) {
        return userService.getPreUser(id);
    }
}
