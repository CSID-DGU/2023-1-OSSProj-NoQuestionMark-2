package com.NoQuestionMark.schedular.service;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.*;
import com.NoQuestionMark.schedular.exception.ErrorCode;
import com.NoQuestionMark.schedular.exception.ScheduleException;
import com.NoQuestionMark.schedular.model.entity.*;
import com.NoQuestionMark.schedular.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.security.auth.Subject;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {

    private final UserRepository userRepository;
    private final CommonScheduleRepository commonScheduleRepository;
    private final SubjectScheduleRepository subjectScheduleRepository;
    private final EntityManager em;
    private final SubjectRepository subjectRepository;
    private final UserSubjectRepository userSubjectRepository;

    public void writeCommonSchedule(CommonScheduleRequestDto requestDto, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        CommonScheduleEntity schedule = CommonScheduleEntity.fromCommonScheduleDto(requestDto, user);
        commonScheduleRepository.save(schedule);
    }

    public ScheduleResponseDto getAllSchedule(Month month, int year, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        List<CommonScheduleResponseDto> cSchedules = em
                .createQuery("select c from CommonScheduleEntity c where c.user = :user and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", CommonScheduleEntity.class)
                .setParameter("user", user)
                .setParameter("startYear", year)
                .setParameter("endYear", year)
                .setParameter("startMonth", month)
                .setParameter("endMonth", month)
                .getResultList()
                .stream()
                .map(CommonScheduleResponseDto::fromCommonSchedule)
                .toList();
        List<UserSubjectsResponseDto> userSubjects = new ArrayList<>(userSubjectRepository
                .findAllByUser(user)
                .stream()
                .map(UserSubjectsResponseDto::fromUserSubject).toList());
        List<SubjectScheduleResponseDto> sSchedules = new ArrayList<>();
        for (UserSubjectsResponseDto userSubject : userSubjects) {
            SubjectEntity subject = subjectRepository.findBySubjectName(userSubject.getSubjectName())
                    .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s에 해당하는 과목이 존재하지 않습니다.", userSubject.getSubjectName())));
            sSchedules.addAll(em
                    .createQuery("select c from SubjectScheduleEntity c where c.subject = :subject and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", SubjectScheduleEntity.class)
                    .setParameter("subject", subject)
                    .setParameter("startYear", year)
                    .setParameter("endYear", year)
                    .setParameter("startMonth", month)
                    .setParameter("endMonth", month)
                    .getResultList()
                    .stream()
                    .map(SubjectScheduleResponseDto::fromSubjectSchedule)
                    .toList());
        }

        return new ScheduleResponseDto(cSchedules, sSchedules);
    }

    public void writeSubjectSchedule(SubjectScheduleRequestDto requestDto, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if(user.getUserType() != UserType.PROFESSOR) throw new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, "교수만 가능한 작업입니다.");
        SubjectEntity subject = subjectRepository
                .findBySubjectName(requestDto.getClassName())
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s 과목이 존재하지 않습니다.", requestDto.getClassName())));
        SubjectScheduleEntity subjectSchedule = SubjectScheduleEntity.fromSubjectScheduleDto(requestDto, user, subject);
        subjectScheduleRepository.save(subjectSchedule);
    }
}
