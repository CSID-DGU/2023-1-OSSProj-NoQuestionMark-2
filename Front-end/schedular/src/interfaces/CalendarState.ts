interface ModalState {
    personal: boolean
    subject: boolean
}
interface ModalToggle{
    handleModalToggle: (value: string) => void;
}
interface EventSourceInput{title : string, start: string}
interface Events extends Array<EventSourceInput> {};

interface CalendarState extends ModalState {
    weekendsVisible: boolean
    events : Events
}


export type{ModalState, CalendarState, ModalToggle, Events};