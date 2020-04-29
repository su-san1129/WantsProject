package jp.co.wants.wants.security;

import jp.co.wants.wants.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/api**").authenticated();
        http.csrf().disable();
        http.cors().configurationSource(this.corsConfigurationSource());
        http.formLogin().loginProcessingUrl("/api/login")
                .permitAll()
                .usernameParameter("mailAddress")
                .passwordParameter("password")
                .successHandler(successHandler())
                .failureHandler(failureHandler());
        http.exceptionHandling().authenticationEntryPoint((request, response, authException) -> {
            System.out.println("authenticationEntryPoint request = " + request);
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


}