package com.NoQuestionMark.schedular.service;


import com.NoQuestionMark.schedular.controller.request.CommonScheduleFixRequestDto;
import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.OfficialScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.scheduleResponseDto.*;
import com.NoQuestionMark.schedular.exception.ErrorCode;
import com.NoQuestionMark.schedular.exception.ScheduleException;
import com.NoQuestionMark.schedular.model.*;
import com.NoQuestionMark.schedular.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Comparator;
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
    private final ScheduleRepository scheduleRepository;

    public ScheduleResponseDto getAllSchedule(Month month, int year, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        List<CommonScheduleResponseDto> cSchedules = new ArrayList<>(em
                .createQuery("select c from CommonScheduleEntity c where c.user = :user and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", CommonScheduleEntity.class)
                .setParameter("user", user)
                .setParameter("startYear", year)
                .setParameter("endYear", year)
                .setParameter("startMonth", month)
                .setParameter("endMonth", month)
                .getResultList()
                .stream().map(CommonScheduleResponseDto::fromSchedule).toList());

        List<SubjectScheduleResponseDto> sSchedules = new ArrayList<>(em
                .createQuery("select c from SubjectScheduleEntity c where c.user = :user and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", SubjectScheduleEntity.class)
                .setParameter("user", user)
                .setParameter("startYear", year)
                .setParameter("endYear", year)
                .setParameter("startMonth", month)
                .setParameter("endMonth", month)
                .getResultList()
                .stream()
                .map(SubjectScheduleResponseDto::fromSubjectSchedule)
                .toList());

        List<UserSubject> userSubjects = userSubjectRepository.findAllByUser(user);
        List<OfficialScheduleResponseDto> oSchedules = new ArrayList<>();
        for (UserSubject userSubject : userSubjects) {
            List<OfficialSubjectScheduleEntity> officialSchedules = em
                    .createQuery("select c from OfficialSubjectScheduleEntity c where c.subject = :subject and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", OfficialSubjectScheduleEntity.class)
                    .setParameter("subject", userSubject.getSubject())
                    .setParameter("startYear", year)
                    .setParameter("endYear", year)
                    .setParameter("startMonth", month)
                    .setParameter("endMonth", month)
                    .getResultList();
            for (OfficialSubjectScheduleEntity schedule : officialSchedules) {
                String complete = userOfficialScheduleRepository
                        .findByScheduleAndUser(schedule, user)
                        .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM))
                        .getComplete().name();
                oSchedules.add(OfficialScheduleResponseDto.fromOfficialSchedule(schedule, complete));
            }
        }

        return new ScheduleResponseDto(cSchedules, sSchedules, oSchedules);
    }

    public void writeSubjectSchedule(SubjectScheduleRequestDto requestDto, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        SubjectEntity subject = subjectRepository
                .findBySubjectName(requestDto.getClassName())
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s 과목이 존재하지 않습니다.", requestDto.getClassName())));
        SubjectScheduleEntity subjectSchedule = SubjectScheduleEntity.fromSubjectScheduleDto(requestDto, user, subject, requestDto.getScheduleType());
        subjectScheduleRepository.save(subjectSchedule);
    }

    public void modifySubjectSchedule(SubjectScheduleRequestDto requestDto, Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        SubjectScheduleEntity subjectSchedule = subjectScheduleRepository
                .findByUserAndId(user, scheduleId)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%s가 작성한 %d 일정을 확인할 수 없습니다.", schoolNumber, scheduleId)));
        SubjectEntity subject = subjectRepository.findBySubjectName(requestDto.getClassName()).orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND));
        if (subjectSchedule.getComplete().name().equals("TRUE")) {
            subjectSchedule.modifySchedule(requestDto, subject, "done");
            return;
        }
        subjectSchedule.modifySchedule(requestDto, subject, requestDto.getScheduleType());
    }

    public void deleteSubjectSchedule(Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        SubjectScheduleEntity subjectSchedule = subjectScheduleRepository
                .findByUserAndId(user, scheduleId)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%s가 작성한 %d 일정을 확인할 수 없습니다.", schoolNumber, scheduleId)));
        subjectScheduleRepository.delete(subjectSchedule);
    }

    public void writeCommonSchedule(CommonScheduleRequestDto requestDto, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        CommonScheduleEntity schedule = CommonScheduleEntity.fromCommonScheduleDto(requestDto, user);
        commonScheduleRepository.save(schedule);
    }

    public void deleteCommonSchedule(Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        CommonScheduleEntity commonSchedule = commonScheduleRepository
                .findByIdAndUser(scheduleId, user)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%s 유저가 작성한 %d 일정을 찾을 수 없습니다.", schoolNumber, scheduleId)));
        commonScheduleRepository.delete(commonSchedule);
    }

    public void modifyCommonSchedule(Long scheduleId, String schoolNumber, CommonScheduleFixRequestDto requestDto) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        CommonScheduleEntity commonSchedule = commonScheduleRepository
                .findByIdAndUser(scheduleId, user)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%s 유저가 작성한 %d 일정을 찾을 수 없습니다.", schoolNumber, scheduleId)));
        if (commonSchedule.getComplete().name().equals("TRUE")) {
            commonSchedule.modifySchedule(requestDto, "done");
            return;
        }
        commonSchedule.modifySchedule(requestDto, requestDto.getScheduleType());
    }

    public void writeOfficialSchedule(OfficialScheduleRequestDto requestDto, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if (user.getUserType() != UserType.PROFESSOR)
            throw new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, "교수만 가능한 작업입니다.");
        SubjectEntity subject = subjectRepository
                .findBySubjectName(requestDto.getClassName())
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s 과목이 존재하지 않습니다.", requestDto.getClassName())));
        userSubjectRepository
                .findByUserAndSubject(user, subject)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, String.format("%s 과목에 대해 일정을 작성할 권한이 없습니다.", requestDto.getClassName())));
        OfficialSubjectScheduleEntity subjectSchedule = OfficialSubjectScheduleEntity.fromOfficialScheduleDto(requestDto, subject, user);
        officialSubjectRepository.saveAndFlush(subjectSchedule);
        List<UserEntity> users = userSubjectRepository
                .findAllBySubject(subject)
                .stream()
                .map(UserSubject::getUser)
                .toList();
        for (UserEntity listener : users) {
            userOfficialScheduleRepository.save(UserOfficialScheduleEntity.newAssignmentFromOfficial(listener, subjectSchedule));
        }
    }

    public void fixOfficialSchedule(OfficialScheduleRequestDto requestDto, Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if (user.getUserType() != UserType.PROFESSOR)
            throw new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, "교수만 가능한 작업입니다.");
        SubjectEntity subject = subjectRepository
                .findBySubjectName(requestDto.getClassName())
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, String.format("%s 과목이 존재하지 않습니다.", requestDto.getClassName())));
        userSubjectRepository
                .findByUserAndSubject(user, subject)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, String.format("%s 과목에 대해 일정을 작성할 권한이 없습니다.", requestDto.getClassName())));
        OfficialSubjectScheduleEntity schedule = officialSubjectRepository
                .findById(scheduleId)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%d 일정을 확인할 수 없습니다.", scheduleId)));
        if (!(schedule.getSubjectScheduleType() == SubjectScheduleType.ASSIGNMENT) && requestDto.getSubjectScheduleType().equals("ASSIGNMENT")) {
            List<UserEntity> users = userSubjectRepository
                    .findAllBySubject(subject)
                    .stream()
                    .map(UserSubject::getUser)
                    .toList();
            for (UserEntity listener : users) {
                userOfficialScheduleRepository.save(UserOfficialScheduleEntity.newAssignmentFromOfficial(listener, schedule));
            }
        }
        if ((schedule.getSubjectScheduleType() == SubjectScheduleType.ASSIGNMENT) && !requestDto.getSubjectScheduleType().equals("ASSIGNMENT")) {
            userOfficialScheduleRepository.deleteAllBySchedule(schedule);
        }
        schedule.scheduleFix(requestDto);
    }

    public void deleteOfficialSchedule(Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if (user.getUserType() != UserType.PROFESSOR)
            throw new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, "교수만 가능한 작업입니다.");
        OfficialSubjectScheduleEntity schedule = officialSubjectRepository
                .findByUserAndId(user, scheduleId)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND, String.format("%d 일정을 확인할 수 없습니다.", scheduleId)));
        officialSubjectRepository.delete(schedule);
    }


    public List<EclassOfficialScheduleResponseDto> getOfficialSchedules(String schoolNumber, String subjectName) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        SubjectEntity subject = subjectRepository
                .findBySubjectName(subjectName).orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND));
        UserSubject userSubject = userSubjectRepository
                .findByUserAndSubject(user, subject).orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND, "해당 유저는 본 과목을 수강하고 있지 않습니다."));
        return new ArrayList<>(officialSubjectRepository
                .findAllBySubject(subject)
                .stream()
                .map(EclassOfficialScheduleResponseDto::officialScheduleResponseDto)
                .toList());
    }

    public List<ToDoListResponseDto> getTodoList(String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        List<UserSubject> userSubject = userSubjectRepository.findAllByUser(user);
        List<ToDoListResponseDto> toDoList = new ArrayList<>(
                commonScheduleRepository.findCommonToDoList(user, LocalDateTime.now())
                        .stream()
                        .map(ToDoListResponseDto::fromCommon)
                        .toList());
        toDoList.addAll(subjectScheduleRepository
                .findSubjectToDoList(user, LocalDateTime.now())
                .stream()
                .map(ToDoListResponseDto::fromSubject).toList());
        for (UserSubject subject : userSubject) {
            List<OfficialSubjectScheduleEntity> officialToDoList = officialSubjectRepository.findOfficialToDoList(subject.getSubject(), LocalDateTime.now());
            for (OfficialSubjectScheduleEntity todolist : officialToDoList) {
                String complete = userOfficialScheduleRepository.findByScheduleAndUser(todolist, user).orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM)).getComplete().name();
                toDoList.add(ToDoListResponseDto.fromOfficial(todolist, complete));
            }
        }
        toDoList.sort(Comparator.comparing(ToDoListResponseDto::getDDay).reversed());
        return toDoList;
    }

    public OfficialScheduleDetailResponseDto getOfficialScheduleDetail(String schoolNumber, Long scheduleId) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        OfficialSubjectScheduleEntity schedule = officialSubjectRepository.findById(scheduleId).orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND));
        String complete = userOfficialScheduleRepository
                .findByScheduleAndUser(schedule, user)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM))
                .getComplete().name();
        return OfficialScheduleDetailResponseDto.officialScheduleResponseDto(schedule, complete);
    }

    public List<SelectedScheduleResponseDto> getSelectedSchedule(Month month, int year, String schoolNumber, String schedule) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        if (schedule.equals("COMMON")) {
            return new ArrayList<>(em
                    .createQuery("select c from CommonScheduleEntity c where c.user = :user and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", CommonScheduleEntity.class)
                    .setParameter("user", user)
                    .setParameter("startYear", year)
                    .setParameter("endYear", year)
                    .setParameter("startMonth", month)
                    .setParameter("endMonth", month)
                    .getResultList()
                    .stream().map(SelectedScheduleResponseDto::fromCommonSchedule).toList());
        }
        List<SelectedScheduleResponseDto> oSchedules = new ArrayList<>(em
                .createQuery("select c from SubjectScheduleEntity c where c.user = :user and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", SubjectScheduleEntity.class)
                .setParameter("user", user)
                .setParameter("startYear", year)
                .setParameter("endYear", year)
                .setParameter("startMonth", month)
                .setParameter("endMonth", month)
                .getResultList()
                .stream().map(SelectedScheduleResponseDto::fromSubjectSchedule).toList());
        List<UserSubject> userSubjects = userSubjectRepository.findAllByUser(user);
        for (UserSubject userSubject : userSubjects) {
            List<OfficialSubjectScheduleEntity> officialSchedules = em
                    .createQuery("select c from OfficialSubjectScheduleEntity c where c.subject = :subject and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", OfficialSubjectScheduleEntity.class)
                    .setParameter("subject", userSubject.getSubject())
                    .setParameter("startYear", year)
                    .setParameter("endYear", year)
                    .setParameter("startMonth", month)
                    .setParameter("endMonth", month)
                    .getResultList();
            for (OfficialSubjectScheduleEntity oSchedule : officialSchedules) {
                String complete = userOfficialScheduleRepository
                        .findByScheduleAndUser(oSchedule, user)
                        .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM))
                        .getComplete().name();
                oSchedules.add(SelectedScheduleResponseDto.fromOfficialSchedule(oSchedule, complete));
            }
        }
        return oSchedules;
    }

    public ScheduleDetailResponseDto getScheduleDetail(String schoolNumber, Long scheduleId) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND));
        String scheduleType = scheduleRepository.findScheduleType(scheduleId);
        if (scheduleType.equals("COMMON"))
            return ScheduleDetailResponseDto.fromCommonSchedule((CommonScheduleEntity) schedule);
        if (scheduleType.equals("SUBJECT"))
            return ScheduleDetailResponseDto.fromSubjectSchedule((SubjectScheduleEntity) schedule);
        String complete = userOfficialScheduleRepository
                .findByScheduleAndUser((OfficialSubjectScheduleEntity) schedule, user)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM))
                .getComplete().name();
        return ScheduleDetailResponseDto.fromOfficialSchedule((OfficialSubjectScheduleEntity) schedule, complete);
    }

    public List<SelectedScheduleResponseDto> getTwiceSelectedSchedule(Month month, int year, String subjectName, String schoolNumber) {
        UserEntity user = userRepository
                .findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 학번을 가진 유자가 없습니다.", schoolNumber)));
        SubjectEntity subject = subjectRepository.findBySubjectName(subjectName)
                .orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND));
        List<SelectedScheduleResponseDto> oSchedules = new ArrayList<>(em
                .createQuery("select c from SubjectScheduleEntity c where c.user = :user and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth) and c.subject = :subject", SubjectScheduleEntity.class)
                .setParameter("subject", subject)
                .setParameter("user", user)
                .setParameter("startYear", year)
                .setParameter("endYear", year)
                .setParameter("startMonth", month)
                .setParameter("endMonth", month)
                .getResultList()
                .stream().map(SelectedScheduleResponseDto::fromSubjectSchedule).toList());
        UserSubject userSubject = userSubjectRepository
                .findByUserAndSubject(user, subject)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_AUTHORIZED, String.format("%s 는 %s 과목을 수강하고 있지 않습니다. ", user.getName(), subjectName)));
        List<OfficialSubjectScheduleEntity> officialSchedules = em
                .createQuery("select c from OfficialSubjectScheduleEntity c where c.subject = :subject and(c.startYear = :startYear or c.endYear = : endYear) and (c.startMonth = :startMonth or c.endMonth = :endMonth)", OfficialSubjectScheduleEntity.class)
                .setParameter("subject", subject)
                .setParameter("startYear", year)
                .setParameter("endYear", year)
                .setParameter("startMonth", month)
                .setParameter("endMonth", month)
                .getResultList();
        for (OfficialSubjectScheduleEntity oSchedule : officialSchedules) {
            String complete = userOfficialScheduleRepository
                    .findByScheduleAndUser(oSchedule, user)
                    .orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM))
                    .getComplete().name();
            oSchedules.add(SelectedScheduleResponseDto.fromOfficialSchedule(oSchedule, complete));
        }
        return oSchedules;
    }
}
