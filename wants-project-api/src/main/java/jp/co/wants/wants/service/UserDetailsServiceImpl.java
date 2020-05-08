package jp.co.wants.wants.service;

import jp.co.wants.wants.domain.LoginUser;
import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String mailAddress) throws UsernameNotFoundException {
        User user = userRepository.findByMailAddress(mailAddress)
                .orElseThrow(()->new UsernameNotFoundException("user not found."));
        if(!user.isMember()) {
            log.info("user is not main registration");
            throw new UsernameNotFoundException("user is not main registration");
        }
        final var authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new LoginUser(user, authorities);
    }
}
