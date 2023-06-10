// memo정민: 이클래스 공식 과목 일정 input interface
interface EclassInput{
  title: string, 
  startDate: string, 
  endDate: string, 
  contents: string, 
  subjectScheduleType: string,
  schedule?: string,
  className?: string,
  dday?: string,
  scheduleId?: string,
}

interface Events extends Array<EclassInput> {};

export type{ EclassInput, Events };