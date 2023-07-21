package com.resteel.podcast_web_app.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
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
                    .anyRequest().authenticated();
        return http.build();
    }
}
