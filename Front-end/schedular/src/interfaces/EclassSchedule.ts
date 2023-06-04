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