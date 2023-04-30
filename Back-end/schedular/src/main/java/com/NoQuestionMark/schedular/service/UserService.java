package com.NoQuestionMark.schedular.service;

import com.NoQuestionMark.schedular.controller.request.UserJoinRequestDto;
import com.NoQuestionMark.schedular.controller.response.UserJoinResponseDto;
import com.NoQuestionMark.schedular.exception.ErrorCode;
import com.NoQuestionMark.schedular.exception.ScheduleException;
import com.NoQuestionMark.schedular.model.User;
import com.NoQuestionMark.schedular.model.entity.UserEntity;
import com.NoQuestionMark.schedular.model.entity.UserType;
import com.NoQuestionMark.schedular.repository.UserRepository;
import com.NoQuestionMark.schedular.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.token.expired-time-ms}")
    private Long expiredTimeMs;
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;

    public User loadUserBySchoolNumber(String schoolNumber){
        return userRepository.findByName(schoolNumber).map(User::fromEntity)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s is not found", schoolNumber)));
    }
    public UserJoinResponseDto join(UserJoinRequestDto requestDto) {
        userRepository.findBySchoolNumber(requestDto.getSchoolNumber())
                .ifPresent(it -> {
                    throw new ScheduleException(ErrorCode.DUPLICATED_CODE, String.format("%s는 이미 가입한 학번입니다.", requestDto.getSchoolNumber()));
                });
        UserEntity user = UserEntity.save(
                requestDto.getSchoolNumber(),
                requestDto.getName(),
                encoder.encode(requestDto.getPassword()),
                UserType.returnUserType(requestDto.getUserType()),
                requestDto.getEmail() );
        return UserJoinResponseDto.toUserJoinResponse(userRepository.save(user));
    }

    //ToDo : implement
    // jwt token 사용을 고려
    public String login(String schoolNumber, String password){

        // 회원가입 여부 체크
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s is not founded", schoolNumber)));

        // 비밀번호 체크
//        if(!encoder.encode(password).equals(user.getPassword())){
        if(!encoder.matches(password, user.getPassword())){
            // if(!user.getPassword().equals(password)){ 암호화 하기 이전 password
            throw new ScheduleException(ErrorCode.INVALID_PASSWORD);
        }

        // 토큰 생성 과정
        return JwtTokenUtils.generateToken(schoolNumber, secretKey, expiredTimeMs);
    }
}
