package com.NoQuestionMark.schedular.service;

import com.NoQuestionMark.schedular.exception.ErrorCode;
import com.NoQuestionMark.schedular.exception.ScheduleException;
import com.NoQuestionMark.schedular.model.*;
import com.NoQuestionMark.schedular.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.DiscriminatorValue;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CompleteService {
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final OfficialSubjectRepository officialSubjectRepository;
    private final CommonScheduleRepository commonScheduleRepository;
    private final SubjectScheduleRepository subjectScheduleRepository;
    private final CompleteRepository completeRepository;

    public Void complete(Long scheduleId, String schoolNumber) {
        UserEntity user = userRepository.findBySchoolNumber(schoolNumber)
                .orElseThrow(() -> new ScheduleException(ErrorCode.USER_NOT_FOUND, String.format("%s 유저가 존재하지 않습니다.", schoolNumber)));
        String scheduleCategory = checkSchedule(scheduleId);
        if(!getSchedule(scheduleCategory, scheduleId)) throw  new ScheduleException(ErrorCode.INVALID_SCHEDULE, "해당 서비스는 완료가 가능한 일정이 아닙니다.");
        ScheduleEntity schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new ScheduleException(ErrorCode.SUBJECT_NOT_FOUND));
        Optional<Complete> complete = completeRepository.findBySchedule(schedule);
        complete.ifPresent(Complete::updateCompleteStatus);
        if(complete.isEmpty())completeRepository.save(Complete.fromPersonalSchedule(schedule));
        return null;
    }

    public String checkSchedule(Long scheduleId){
        if(scheduleRepository.findScheduleType(scheduleId).equals("OFFICIAL_SUBJECT")) return OfficialSubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value();
        if(scheduleRepository.findScheduleType(scheduleId).equals("SUBJECT")) return SubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value();
        if(scheduleRepository.findScheduleType(scheduleId).equals("COMMON")) return CommonScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value();
        throw new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM);
    }

    public boolean getSchedule(String schedule, Long scheduleId){
        if(schedule.equals("OFFICIAL_SUBJECT")) return completeOfficialPossibilityCheck(scheduleId);
        if(schedule.equals("SUBJECT")) return completeSubjectPossibilityCheck(scheduleId);
        if(schedule.equals("COMMON")) return completeCommonPossibilityCheck(scheduleId);
        throw new ScheduleException(ErrorCode.SCHEDULE_TYPE_PROBLEM);
    }

    public boolean completeOfficialPossibilityCheck(Long scheduleId){
        OfficialSubjectScheduleEntity schedule = officialSubjectRepository.findById(scheduleId).orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND));
        return schedule.getSubjectScheduleType().name().equals("ASSIGNMENT");
    }

    public boolean completeSubjectPossibilityCheck(Long scheduleId){
        SubjectScheduleEntity schedule = subjectScheduleRepository.findById(scheduleId).orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND));
        return schedule.getScheduleType().name().equals("TASK");
    }

    public boolean completeCommonPossibilityCheck(Long scheduleId){
        CommonScheduleEntity schedule = commonScheduleRepository.findById(scheduleId).orElseThrow(() -> new ScheduleException(ErrorCode.SCHEDULE_NOT_FOUND));
        return schedule.getScheduleType().name().equals("TASK");
    }
}
