package jp.co.wants.wants.security;

import jp.co.wants.wants.repository.UserRepository;
import jp.co.wants.wants.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.GenericFilterBean;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class).sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                .antMatchers("/api/users/register/**", "/api/users/pre_user/**").permitAll()
                .antMatchers("/api/**").authenticated();
        http.csrf().disable();
        http.cors().configurationSource(this.corsConfigurationSource());
        http.formLogin()
                .loginProcessingUrl("/api/login").permitAll()
                .usernameParameter("email")
                .passwordParameter("password")
                .successHandler(successHandler())
                .failureHandler(failureHandler());
        http.exceptionHandling().authenticationEntryPoint((request, response, authException) -> {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }).accessDeniedHandler((request, response, accessDeniedException) -> {
            System.out.println("accessDeniedHandler request = " + request);
        });
        http.headers().frameOptions().sameOrigin();
    }

    private CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);

        // どのHttpメソッドを許可するか(GET, POSTなど)
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        // レスポンスヘッダーの設定
        configuration.addExposedHeader(HttpHeaders.LOCATION);
        configuration.addExposedHeader(HttpHeaders.AUTHORIZATION);

        configuration.addAllowedOrigin("http://localhost:4200");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    SuccessHandler successHandler(){
        return new SuccessHandler();
    }

    FailureHandler failureHandler(){
        return new FailureHandler();
    }

    GenericFilterBean jwtTokenFilter() { return new JwtTokenFilter(userRepository, "SecretKey");
    }


}