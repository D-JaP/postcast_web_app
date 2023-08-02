package com.resteel.podcast_web_app.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
                .antMatchers(HttpMethod.GET, "/admin").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.GET).permitAll()
                .antMatchers(HttpMethod.DELETE,"/podcasts").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/podcasts").hasRole("ADMIN")
                .antMatchers(HttpMethod.PATCH,"/podcasts").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/podcasts").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .defaultSuccessUrl("/admin")
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");

        return http.build();
    }

    @Bean
    public UserDetailsService inMemoryUser() {
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2a$10$paO7JrUA1JG/EmLVwhN7suq6Xk0ztig6jNtTGScuW4Ah2msHW0cve")
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }


}
