package com.NoQuestionMark.schedular.configuration;


import com.NoQuestionMark.schedular.configuration.filter.JwtTokenFilter;
import com.NoQuestionMark.schedular.exception.CustomAuthenticationEntryPoint;
import com.NoQuestionMark.schedular.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


// security 설정을 위한 bean
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthenticationConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    @Value("${jwt.secret-key}")
    private String key;

    // 회원가입, 로그인 시 로그인 정보가 없다 -> 어떤 유저든 허용 세션 관리 x
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .authorizeRequests()
                .antMatchers("/signup", "/login").permitAll()
                .antMatchers("/**").authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // 유저이름과 패스워드 검증이 필요할 때, 데이털르 가져올 때 사용하는 필터
                .and()
                .addFilterBefore(new JwtTokenFilter(key, userService), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()); // 오류 발생 시 옮겨갈 수 있는 거 -> 이 부분 구현으로 오류 내용 등을 전달 가능
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("https://www.donggukschedule.com");
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "OPTIONS", "PUT","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
