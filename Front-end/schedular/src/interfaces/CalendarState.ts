
interface ModalToggle{
    handleModalToggle: (value: string) => void;
    id? : string;
}
//scheduleType : task, schedule (개인), 과제,시험,발표 (과목)
//type : personal(개인), subject(과목)
interface EventSourceInput{
    title: string, 
    startDate: string, 
    endDate?: string, 
    contents:string, 
    importance?: string, 
    scheduleType?: string,
    commonScheduleType?: string,
    subject?:string,
    type?:string
}

interface Events extends Array<EventSourceInput> {};


export type{ ModalToggle, EventSourceInput,Events};