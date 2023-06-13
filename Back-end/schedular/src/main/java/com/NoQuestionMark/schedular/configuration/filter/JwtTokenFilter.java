package com.NoQuestionMark.schedular.configuration.filter;

import com.NoQuestionMark.schedular.model.User;
import com.NoQuestionMark.schedular.service.UserService;

import com.NoQuestionMark.schedular.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


// 요청 대마다 검증하는 필터
@Slf4j
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final String key;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 인증과 관련된 Header를 받아온다.
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        // header 에 유효한 값이 없을 때
        if(header == null || !header.startsWith("Bearer ")){
            log.error("Error occurs while getting header. header is null or invalid");
            filterChain.doFilter(request, response);
            return;
        }

        // header 가 정상적으로 있는 경우
        try{
            final String token = header.split(" ")[1].trim();

            //Todo : check token is valid
            if(JwtTokenUtils.isExpired(token, key)){
                log.error("key is expired");
                filterChain.doFilter(request, response);
                return;
            }

            //Todo : get userName from token
            String schoolNumber = JwtTokenUtils.getSchoolNumber(token, key);


            //Todo : check the userName is valid
            User user = userService.loadUserBySchoolNumber(schoolNumber);
            // 다시 request에 넣어서 controller로 보내주는 부분
            // 인증된 유저 정보를 넣어준다.
            // principal(누구), credentials(자격), authorities(권한)
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    // Todo
                    user, null, user.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request ));
            // 넣어준 유저 정보를 다시 넣어준다.
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);  // request 정보 함께 전달
        } catch (RuntimeException e){
            log.error("Error occurs while validating {}", e.toString());
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
