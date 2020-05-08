package jp.co.wants.wants.controller;

import jp.co.wants.wants.ResourcePath;
import jp.co.wants.wants.form.LoginForm;
import jp.co.wants.wants.form.RegisterForm;
import jp.co.wants.wants.form.ValidateIdForm;
import jp.co.wants.wants.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping(ResourcePath.USERS)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<String> test(){
        return List.of();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void login(@RequestBody LoginForm loginForm){
        System.out.println(loginForm);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterForm registerForm){
        userService.save(registerForm);
    }

    @PostMapping("/register/main_registration")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerMainRegistration(@RequestBody ValidateIdForm validateIdForm){
        final String decodeUrl = new String(Base64.getUrlDecoder().decode(validateIdForm.getValidateId()));
        userService.checkUserId(decodeUrl);
    }
}
