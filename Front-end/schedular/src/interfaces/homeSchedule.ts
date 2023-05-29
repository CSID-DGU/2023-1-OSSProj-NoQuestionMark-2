interface subjects {
    subjectName : string;
    subjectId: string;
}
interface schedules {
    title : string;
    dday : string;
}
interface Subjects extends Array<subjects> {};
interface Schedules extends Array<schedules> {};

export type{Subjects,Schedules,schedules,subjects};