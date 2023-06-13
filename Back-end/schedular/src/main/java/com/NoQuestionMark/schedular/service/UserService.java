package com.NoQuestionMark.schedular.service;


import com.NoQuestionMark.schedular.controller.request.UserJoinRequestDto;
import com.NoQuestionMark.schedular.controller.response.userResponseDto.*;
import com.NoQuestionMark.schedular.exception.ErrorCode;
import com.NoQuestionMark.schedular.exception.ScheduleException;
import com.NoQuestionMark.schedular.model.*;
import com.NoQuestionMark.schedular.repository.*;
import com.NoQuestionMark.schedular.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${jwt.secret-key}")
    private String secretKey;
    @Value("${jwt.token.expired-time-ms}")
    private Long expiredTimeMs;

    private final UserRepository userRepository;
    private final UserSubjectRepository userSubjectRepository;
    private final SubjectRepository subjectRepository;
    private final CommonScheduleRepository commonScheduleRepository;
    private final SubjectScheduleRepository subjectScheduleRepository;
    private final OfficialSubjectRepository officialSubjectRepository;
    private final BCryptPasswordEncoder encoder;

    public User loadUserBySchoolNumber(String schoolNumber) {
        return userRepository.findBySchoolNumber(schoolNumber).map(User::fromEntity)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 사람이 없습니다.", schoolNumber)));
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
                requestDto.getEmail());
        UserJoinResponseDto result = UserJoinResponseDto.toUserJoinResponse(userRepository.save(user));
        List<Long> idArray = makeRandom();
        for (int i = 0; i < 5; i++) {
            Optional<SubjectEntity> subject = Optional.ofNullable(subjectRepository.findById(idArray.get(i))
                    .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND)));
            UserSubject userSubject = UserSubject.fromUserSubject(user, subject.get());
            userSubjectRepository.save(userSubject);
        }
        return result;
    }


    public static List<Long> makeRandom() {
        List<Long> randomArray = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            long num = (long) ((Math.random() * 22) + 1);
            if (randomArray.contains(num)) {
                i--;
            } else randomArray.add(num);
        }
        return randomArray;
    }

    //ToDo : implement
    // jwt token 사용을 고려
    public UserLoginResponseDto login(String schoolNumber, String password) {

        // 회원가입 여부 체크
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.INVALID_LOGIN));

        // 비밀번호 체크
        if (!encoder.matches(password, user.getPassword())) {
            throw new ScheduleException(ErrorCode.INVALID_LOGIN);
        }

        // 토큰 생성 과정
        String token = JwtTokenUtils.generateToken(schoolNumber, user.getName(), user.getUserType(), secretKey, expiredTimeMs);
        return new UserLoginResponseDto(token, user.getName(), user.getSchoolNumber(), user.getUserType().name());
    }

    public UserHomeResponseDto getHome(String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s is not founded", schoolNumber)));
        List<UserSubjectsResponseDto> userSubjects = new ArrayList<>(userSubjectRepository
                .findAllByUser(user)
                .stream()
                .map(UserSubjectsResponseDto::fromUserSubject).toList());
        userSubjects.sort(Comparator.comparing(UserSubjectsResponseDto::getSubjectName));
        List<UserScheduleResponseDto> userSchedule = new ArrayList<>(commonScheduleRepository
                .findAllByUserAndStartDateGreaterThanOrderByStartDateAsc(user, LocalDateTime.now())
                .stream().map(UserScheduleResponseDto::fromCommonSchedule).toList());
        userSchedule.addAll(subjectScheduleRepository
                .findAllByUserAndStartDateGreaterThanOrderByStartDateAsc(user, LocalDateTime.now())
                .stream()
                .map(UserScheduleResponseDto::fromSubjectSchedule)
                .toList());
        for (UserSubjectsResponseDto userSubject : userSubjects) {
            SubjectEntity subject = subjectRepository.findBySubjectName(userSubject.getSubjectName())
                    .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s에 해당하는 과목이 존재하지 않습니다.", userSubject.getSubjectName())));
            userSchedule.addAll(officialSubjectRepository.findAllBySubjectAndStartDateGreaterThanOrderByStartDateAsc(subject, LocalDateTime.now())
                    .stream()
                    .map(UserScheduleResponseDto::fromOfficialSchedule)
                    .toList());
        }
        userSchedule.sort(Comparator.comparingInt(UserScheduleResponseDto::getDDay).reversed());
        if (userSchedule.size() > 5) userSchedule.subList(0,5);
        return new UserHomeResponseDto(user.getName(), user.getSchoolNumber(), user.getUserType().name(), userSubjects, userSchedule);

    }
}
