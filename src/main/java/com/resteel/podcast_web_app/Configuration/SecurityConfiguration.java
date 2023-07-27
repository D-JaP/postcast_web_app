package com.resteel.podcast_web_app.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                    .antMatchers("/*"
                            ,"/css/**",
                        "/episode/**",
                        "/images/**",
                        "/js/**",
                        "/src/**",
                        "/podcasts/**",
                        "/tags/**",

                        "/episodes/*"


                    )
                    .permitAll()
                    .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/admin/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();
        return http.build();
    }


    @Bean
    public UserDetailsService user(){
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2a$10$paO7JrUA1JG/EmLVwhN7suq6Xk0ztig6jNtTGScuW4Ah2msHW0cve")
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }




}
