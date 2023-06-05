package com.NoQuestionMark.schedular.util;

import com.NoQuestionMark.schedular.model.UserType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtTokenUtils {

    // 토큰에서도 userName을 가져오는 메서드
    public static String getSchoolNumber(String token, String key){
        return extractClaims(token, key).get("schoolNumber", String.class);
    }

    // 현재 시간보다 만료 시간이 긴지 아닌지 여부로 토큰 만료 시간 확인
    public static boolean isExpired(String token, String key){
        Date expiredDate = extractClaims(token, key).getExpiration();
        return expiredDate.before(new Date());
    }

    // token 에서 Claims 부분 추출하는 메소드
    private static Claims extractClaims(String token, String key){
        return Jwts.parserBuilder().setSigningKey(getKey(key))
                .build().parseClaimsJws(token).getBody();
    }

    // token username 넣고, key는 userName 넣은 값을 암호화, 유효 기간
    public static String generateToken(String schoolNumber, String name, UserType userType, String key, long expiredTimeMs){
        Claims claims = Jwts.claims();
        claims.put("schoolNumber", schoolNumber);
        claims.put("name", name);
        claims.put("userType", userType);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredTimeMs))
                .signWith(getKey(key), SignatureAlgorithm.HS256)
                .compact();
    }

    private static Key getKey(String key){
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
