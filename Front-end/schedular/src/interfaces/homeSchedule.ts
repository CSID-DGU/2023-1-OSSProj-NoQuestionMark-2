interface subjects {
    subjectName : string;
}
interface schedules {
    title : string;
}
interface Subjects extends Array<subjects> {};
interface Schedules extends Array<schedules> {};

export type{Subjects,Schedules};