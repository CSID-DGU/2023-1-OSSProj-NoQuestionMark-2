// memo지혜 : 캘린더에서 사용하는 모달에 대한 interface
interface ModalToggle{
    // memo지혜 : 모달을 여닫는 함수 속성
    handleModalToggle: (value: string) => void;
    // memo지혜 : 수정, 삭제를 위한 속성
    id? : string;
    subjectList?: string[];
    // memo지혜 : 선택한 일정 속성
    event?:EventSourceInput;
    // memo지혜 : 리렌더링을 위한 함수 속성
    getApi?: (year: string, month: string) => void;
    // memo지혜 : 리렌더링을 위한 함수에 필요한 props 속성
    date?:string[]|undefined;
}

interface EventSourceInput{
    scheduleId?: string,
    title: string, 
    startDate: string, 
    endDate: string, 
    contents:string, 
    importance: string,    
    className?:string,
    type?:string,
    dday?:string,
    complete?:string,
    // memo지혜 : 일정 꾸미기 속성
    color?:string,
    imageurl?:string,
    // memo지혜 : TASK, SCHEDULE
    scheduleType?: string,
    // memo지혜 : ASSIGNMENT, TEST, PRESENTATION
    subjectScheduleType?:string,
    // memo지혜 : COMMON, SUBJECT, OFFICIAL
    schedule?:string,
}

interface Events extends Array<EventSourceInput> {};


export type{ ModalToggle, EventSourceInput,Events};