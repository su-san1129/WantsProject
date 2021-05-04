package jp.co.wants.wants.service;

import jp.co.wants.wants.domain.LoginUser;
import jp.co.wants.wants.domain.PreUser;
import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.domain.UserRole;
import jp.co.wants.wants.repository.PreUserRepository;
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
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        final var authorities = new ArrayList<GrantedAuthority>();
        if (userOpt.isPresent()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + UserRole.MEMBER));
            return new LoginUser(userOpt.get(), authorities);
        } else {
            PreUser preUser = preUserRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("The Username is not found."));
            authorities.add(new SimpleGrantedAuthority("ROLE_" + UserRole.PRE_MEMBER));
            return new LoginUser(preUser.toUser(), authorities);
        }
    }
}
