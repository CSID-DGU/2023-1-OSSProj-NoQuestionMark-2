interface ModalToggle{
    handleModalToggle: (value: string) => void;
    id? : string;
    subjectList?: string[];
    event?:EventSourceInput;
    getApi?: (year: string, month: string) => void;
    date?:string[]|undefined;
}

interface EventSourceInput{
    scheduleId?: string,
    title: string, 
    startDate: string, 
    endDate: string, 
    contents:string, 
    importance: string, 
    scheduleType?: string,
    className?:string,
    type?:string,
    dday?:string,
    color?:string,
    complete?:string,
    imageurl?:string,
    // TASK, SCHEDULE
    commonScheduleType?: string,
    // ASSIGNMENT, TEST, PRESENTATION
    subjectScheduleType?:string,
    // COMMON, SUBJECT, OFFICIAL
    schedule?:string,
}

interface Events extends Array<EventSourceInput> {};


export type{ ModalToggle, EventSourceInput,Events};