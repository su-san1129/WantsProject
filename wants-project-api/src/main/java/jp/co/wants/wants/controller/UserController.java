package jp.co.wants.wants.controller;

import jp.co.wants.wants.ResourcePath;
import jp.co.wants.wants.form.LoginForm;
import jp.co.wants.wants.form.RegisterForm;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ResourcePath.USERS)
public class UserController {

    @CrossOrigin
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void login(@RequestBody LoginForm loginForm){
        System.out.println("ResourcePath.USERS = " + ResourcePath.USERS);
        System.out.println(loginForm);
    }

    @CrossOrigin
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterForm registerForm){
        System.out.println(registerForm);
    }
}
