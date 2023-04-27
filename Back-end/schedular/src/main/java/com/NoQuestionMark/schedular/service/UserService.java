package com.NoQuestionMark.schedular.service;

import com.NoQuestionMark.schedular.controller.request.UserJoinRequestDto;
import com.NoQuestionMark.schedular.controller.response.UserJoinResponseDto;
import com.NoQuestionMark.schedular.exception.ErrorCode;
import com.NoQuestionMark.schedular.exception.ScheduleException;
import com.NoQuestionMark.schedular.model.entity.UserEntity;
import com.NoQuestionMark.schedular.model.entity.UserType;
import com.NoQuestionMark.schedular.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;
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
}
