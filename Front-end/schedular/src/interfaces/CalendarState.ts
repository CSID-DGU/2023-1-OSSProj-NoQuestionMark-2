interface ModalState {
    personalPost: boolean,
    subjectPost: boolean,
    personalRead: boolean,
    subjectRead: boolean,
}
interface ModalToggle{
    handleModalToggle: (value: string) => void;
}
//scheduleType : task, schedule (개인), 과제,시험,발표 (과목)
//type : personal, subject
interface EventSourceInput{title: string, startDate: string, endDate?: string, contents:string, importance?: string, scheduleType: string, type?:string }

interface Events extends Array<EventSourceInput> {};

interface CalendarState extends ModalState {
    events : Events;
}


export type{ModalState, CalendarState, ModalToggle};