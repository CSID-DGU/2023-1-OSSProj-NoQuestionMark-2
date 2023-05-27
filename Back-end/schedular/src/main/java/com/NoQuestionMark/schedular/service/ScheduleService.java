package com.NoQuestionMark.schedular.service;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleFixRequestDto;
import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.OfficialScheduleRequestDto;
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
    private final OfficialSubjectRepository officialSubjectRepository;
    private final UserOfficialScheduleRepository userOfficialScheduleRepository;

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
        SubjectEntity subject = subjectRepository
                .findBySubjectName(requestDto.getClassName())
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s 과목이 존재하지 않습니다.", requestDto.getClassName())));
        SubjectScheduleEntity subjectSchedule = SubjectScheduleEntity.fromSubjectScheduleDto(requestDto, user, subject);
        subjectScheduleRepository.save(subjectSchedule);
    }

    public void deleteSchedule(Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        CommonScheduleEntity commonSchedule = commonScheduleRepository
                .findByIdAndUser(scheduleId, user)
                .orElseThrow(()-> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%s 유저가 작성한 %d 일정을 찾을 수 없습니다.", schoolNumber, scheduleId)));
        commonScheduleRepository.delete(commonSchedule);
    }

    public void modifySchedule(Long scheduleId, String schoolNumber, CommonScheduleFixRequestDto requestDto) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        CommonScheduleEntity commonSchedule = commonScheduleRepository
                .findByIdAndUser(scheduleId, user)
                .orElseThrow(()-> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%s 유저가 작성한 %d 일정을 찾을 수 없습니다.", schoolNumber, scheduleId)));
        commonSchedule.fixSchedule(requestDto);
    }

    public void writeOfficialSchedule(OfficialScheduleRequestDto requestDto, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if(user.getUserType() != UserType.PROFESSOR) throw new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, "교수만 가능한 작업입니다.");
        SubjectEntity subject = subjectRepository
                .findBySubjectName(requestDto.getClassName())
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s 과목이 존재하지 않습니다.", requestDto.getClassName())));
        userSubjectRepository
                .findByUserAndSubject(user, subject)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, String.format("%s 과목에 대해 일정을 작성할 권한이 없습니다.", requestDto.getClassName())));
        OfficialSubjectScheduleEntity subjectSchedule = OfficialSubjectScheduleEntity.fromOfficialScheduleDto(requestDto, subject);
        officialSubjectRepository.save(subjectSchedule);
        if (subjectSchedule.getSubjectScheduleType() == SubjectScheduleType.ASSIGNMENT){
            List<UserEntity> users = userSubjectRepository
                    .findAllBySubject(subject)
                    .stream()
                    .map(UserSubject::getUser)
                    .toList();
            for(UserEntity listener : users){
                userOfficialScheduleRepository.save(UserOfficialScheduleEntity.assignNew(listener, subject));
            }
        }
    }

    public void fixOfficialSchedule(OfficialScheduleRequestDto requestDto, Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if(user.getUserType() != UserType.PROFESSOR) throw new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, "교수만 가능한 작업입니다.");
        SubjectEntity subject = subjectRepository
                .findBySubjectName(requestDto.getClassName())
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s 과목이 존재하지 않습니다.", requestDto.getClassName())));
        userSubjectRepository
                .findByUserAndSubject(user, subject)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, String.format("%s 과목에 대해 일정을 작성할 권한이 없습니다.", requestDto.getClassName())));
        OfficialSubjectScheduleEntity schedule = officialSubjectRepository
                .findById(scheduleId)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%d 일정을 확인할 수 없습니다.", scheduleId)));
        schedule.ScheduleFix(requestDto);
    }
}
