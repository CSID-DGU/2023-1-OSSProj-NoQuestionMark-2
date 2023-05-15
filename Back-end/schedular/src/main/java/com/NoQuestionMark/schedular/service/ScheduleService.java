package com.NoQuestionMark.schedular.service;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.CommonScheduleResponseDto;
import com.NoQuestionMark.schedular.controller.response.ScheduleResponseDto;
import com.NoQuestionMark.schedular.controller.response.SubjectScheduleResponseDto;
import com.NoQuestionMark.schedular.controller.response.UserScheduleResponseDto;
import com.NoQuestionMark.schedular.exception.ErrorCode;
import com.NoQuestionMark.schedular.exception.ScheduleException;
import com.NoQuestionMark.schedular.model.entity.CommonScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.SubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.UserEntity;
import com.NoQuestionMark.schedular.model.entity.UserType;
import com.NoQuestionMark.schedular.repository.CommonScheduleRepository;
import com.NoQuestionMark.schedular.repository.SubjectScheduleRepository;
import com.NoQuestionMark.schedular.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
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
        List<SubjectScheduleResponseDto> sSchedules = em
                .createQuery("select c from SubjectScheduleEntity c where c.user = :user and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", SubjectScheduleEntity.class)
                .setParameter("user", user)
                .setParameter("startYear", year)
                .setParameter("endYear", year)
                .setParameter("startMonth", month)
                .setParameter("endMonth", month)
                .getResultList()
                .stream()
                .map(SubjectScheduleResponseDto::fromSubjectSchedule)
                .toList();
        return new ScheduleResponseDto(cSchedules, sSchedules);
    }

    public void writeSubjectSchedule(SubjectScheduleRequestDto requestDto, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if(user.getUserType() != UserType.PROFESSOR) throw new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, "교수만 가능한 작업입니다.");
        SubjectScheduleEntity subjectSchedule = SubjectScheduleEntity.fromSubjectScheduleDto(requestDto, user);
        subjectScheduleRepository.save(subjectSchedule);
    }
}
