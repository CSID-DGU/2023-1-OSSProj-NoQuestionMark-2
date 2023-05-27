interface ModalToggle{
    handleModalToggle: (value: string) => void;
    id? : string;
    subjectList?: string[];
    event?:EventSourceInput;
    getApi?: (year: string, month: string) => void;
    date?:string[]|undefined;
}
//commonScheduleType : task, schedule (개인), 
//subjectScheduleType : 과제,시험,발표 (과목)
//type : personal(개인), subject(과목)
interface EventSourceInput{
    scheduleId?: string,
    title: string, 
    startDate: string, 
    endDate: string, 
    contents:string, 
    importance: string, 
    scheduleType?: string,
    commonScheduleType?: string,
    subjectScheduleType?:string,
    className?:string,
    type?:string,
    dday?:string,
    color?:string,
    complete?:string,
    imageurl?:string,
}

interface Events extends Array<EventSourceInput> {};


export type{ ModalToggle, EventSourceInput,Events};