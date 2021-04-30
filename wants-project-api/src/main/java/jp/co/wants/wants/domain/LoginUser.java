package jp.co.wants.wants.domain;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class LoginUser extends org.springframework.security.core.userdetails.User {
    private final User user;

    public LoginUser(User user, Collection<? extends GrantedAuthority> authorities) {
        super(user.getEmail(), user.getPassword(), authorities);
        this.user = user;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return super.getAuthorities();
    }
    public User getUser(){
        return user;
    }
}
