import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import SubjectScheduleAdd from 'Components/SubjectScheduleAdd';
import PersonalScheduleAdd from 'Components/PersonalScheduleAdd';
import PersonalScheduleDetail from 'Components/PersonalScheduleDetail';
import SubjectDetailProf from 'Components/SubjectDetail';
import { EventSourceInput } from 'interfaces/CalendarState';
import { Subjects,subjects, schedules, Schedules } from 'interfaces/homeSchedule';
import Icon from 'Assets/Images/check.png';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoState, EventState } from 'recoil/Atom';
import { v4 as uuidv4 } from 'uuid';
import * as Api from 'lib/Api';

const Container = styled.div`
  width : 80%;
  margin : 3rem auto 5rem;
`;
const RightAlign = styled.div`
  display :felx;
  felx-direction : row;
  justify-content : flex-end;

  &:first-child {
      margin-bottom : 2rem;
  }
  &:last-child {
      margin-top : 2rem;
  }
`;
const PostBtn = styled.button<ButtonProps>`
  &:first-child {
      margin-right : 1rem;
  }

  width : 9.5rem;
  height : 2.8rem;
  background-color : ${props => props.btnName === 'personal'? '#6ED746': 'orange'};
  border:none;
  border-radius: 5px;
  color: white;
  padding: 0.2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`; 
const CalendarDiv = styled.div`
  display: felx;
  flex-direction: row;
`;
const CalendarBody = styled.div`
  width: 75%; 
`
const TaskBody = styled.div`
  width: 22%;
  margin-left: 3%;
`
const TodoList = styled.div`
  height: 60%;
  text-align: left;
  padding-left: 1.0rem;
  border: 2px solid orange;
  border-radius: 5px;
`;
const TodoTask = styled.div`
  display: flex;
  justify-content: space-between;
  margin : 0.2rem 1.2rem 0.2rem 0.2rem;
`;
const CompleteList = styled.div`
  text-align: left;
  margin-top: 1rem;
  padding-left: 1rem;
  border: 2px solid orange;
  border-radius: 5px;
  height : 37%;
`
const Subheading = styled.h3`
  display: block;
  margin-bottom: 2rem;
`
const Dday = styled.div`
  background-color: #12314f;
  color: #fff;
  border-radius: 5px;
`
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnName: string;
}

const IMPORTANCE = ['EASYGOING','NORMAL','IMPORTANT'];
const ALPHA = [0.3, 0.6, 0.9];

const getTodayMonth = () => {
  const Tmonth = String(new Date().getMonth()+1);
  if(Tmonth.length === 1 ) { return `0${Tmonth}`}
  return Tmonth;
}
const getTodayYear = () => {
  return String(new Date().getFullYear());
}


const Calendar = () =>{
  const [subjectList, setSubjectList] =useState<string[]>([]);
  const [scheduleList, setScheduleList] = useState<Schedules>([]);
  const [postModal, setpostModal] = useState({ personalPost: false, subjectPost: false});
  const [readModal, setReadModal] = useState({ personalRead: false, subjectRead: false});
  const [evt, setEvents] = useState<EventSourceInput>();
  const [id, setId] = useState('');
  const [month, setMonth] = useState(getTodayMonth);
  const [year, setYear] = useState(getTodayYear);
  const [evtState,setEvtState]= useRecoilState(EventState);
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() =>{
    (async () => {
      try {
        await performGetRequest(year,month);
      } catch (error) {
        console.error(error);
      }
    })();
  },[])

  useEffect(() =>{
    performGetRequest(year,month);
  },[month,year]);

  const reloadTaskList = async() => {
    await Api.get('/home').then((res)=>{
      const result = res.data.result
      console.log(result);
      const {schedule,subjects} = result;
      setSubjectList([...subjects.map((el:subjects)=> el.subjectName)]);
      setScheduleList([...schedule.map((el:schedules)=> { return {'title': el.title,'dday': String(el.dday)}})])
    });
  }

  const reloadCalendarEvents =async (year:string, month:string) => {
    const visitedMonth = `${year}-${month}`;

    const response = await Api.get(`/schedule/common?month=${visitedMonth}`);
    const {commonSchedule,subjectSchedule,officialSchedule} = response.data.result;
    console.log(commonSchedule,subjectSchedule);
    // console.log(commonSchedule, subjectSchedule,officialSchedule);

    commonSchedule.forEach((s: EventSourceInput) => {
      const idx = IMPORTANCE.indexOf(s.importance);
      s['color'] = `rgba(255,0,0,${ALPHA[idx]})`;
      s.scheduleType === 'TASK' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
    });

    subjectSchedule.forEach((s: EventSourceInput) => {
      const idx = IMPORTANCE.indexOf(s.importance);
      s['color'] = `rgba(0,255,0,${ALPHA[idx]})`;
      s.scheduleType === 'TASK' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
    });

    officialSchedule.forEach((s: EventSourceInput) => {
      s['color'] = `rgba(0,0,255,1.0)`;
    });

    const newEventList = [...commonSchedule, ...subjectSchedule,...officialSchedule];  
    setEvtState([...newEventList.map(event =>({
      ...event,
      'start': event.startDate,
      'end': event.endDate
    }))]); 
  }

  const performGetRequest = async (year: string, month: string) => {
    try {    
      reloadTaskList();  
      reloadCalendarEvents(year, month);      
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

  // modal
  const handlePostModalToggle = (type:string) => {
    type==='personal' ?
    setpostModal({...postModal, personalPost: !postModal.personalPost})
    :setpostModal({...postModal, subjectPost : !postModal.subjectPost})
  }

  const handleReadModalToggle = (info:any) => {
    let {_def} = info.event;
    let title = _def.title;
    let className = _def.ui.classNames[0];
    let {contents,startDate, endDate, scheduleId, importance, schedule, scheduleType, subjectScheduleType} = _def.extendedProps;
    console.log(info.event);

    setId(scheduleId);
    if(schedule === 'COMMON'){
      setEvents({title,contents, startDate, endDate, importance, scheduleType});
      setReadModal({...readModal, personalRead: !readModal.personalRead})
    }
    else {
      console.log(title,contents,startDate, endDate, importance, className, subjectScheduleType, scheduleType);
      setEvents({title,contents,startDate, endDate, importance, className, subjectScheduleType, scheduleType});
      setReadModal({...readModal, subjectRead : !readModal.subjectRead})
    }
  }

  const eventContent = (arg:any) => {
    const {title} = arg.event;
    const {color, imageurl} = arg.event.extendedProps;
    return (
      <div className="event" style={color}>
        { imageurl && <img className="event-icon" src={imageurl} alt="이벤트 아이콘" />}
        <span className="event-title">{title}</span>
      </div>
    );
  };

  return (
    <>
      { evtState ? 
      <Container>
        <RightAlign>
          <select name='pets' id='pet-select'>
            <option value=''>--전체보기--</option>
            <option value='subject'>과목일정보기</option>
            <option value='personal'>개인일정보기</option>
          </select>
        </RightAlign>
    
        <CalendarDiv>
          <CalendarBody>
            <FullCalendar
              ref={calendarRef}
              plugins={[ dayGridPlugin, timeGridPlugin,interactionPlugin ]}
              initialView='dayGridMonth'
              locale={koLocale}
              eventContent={eventContent}
              customButtons={{
                nextButton: {
                  text: '>',
                  click: function () {
                    const calendarApi = calendarRef.current?.getApi();
                    const currentDate = calendarApi?.getDate();
                    const currentMonth = currentDate?.getMonth() ?? 0;
                    const currentYear = currentDate?.getFullYear() ?? 0;
                    const nextDate = currentDate || new Date();
                    const nextMonth = currentMonth + 1;
                    const nextYear = currentYear; 

                    const currentView = calendarApi?.view;
                    if (currentView?.type === 'dayGridMonth') {
                      calendarApi?.gotoDate(new Date(nextYear, nextMonth));
                    }
                    else if (currentView?.type === 'timeGridWeek') {                      
                      nextDate.setDate(nextDate.getDate() + 7);
                      calendarApi?.gotoDate(nextDate);
                    }
                    else{
                      nextDate.setDate(nextDate.getDate() + 1);
                      calendarApi?.gotoDate(nextDate);
                    }
                    if(nextDate.getMonth() !== nextMonth){
                      let new_M = (nextMonth+1).toString().length === 1 ? `0${nextMonth+1}` : `${nextMonth+1}`;
                      const new_Y = Number(new_M)>12 ? (nextYear+1).toString(): nextYear.toString();
                      if(nextMonth >= 12)  new_M = '01';
                      setMonth(new_M);
                      setYear(new_Y);
                    }
                  },
                },
                preButton : {
                  text: '<',
                  click: function () {
                    const calendarApi = calendarRef.current?.getApi();
                    const currentDate = calendarApi?.getDate();
                    const currentMonth = currentDate?.getMonth() ?? 0;
                    const currentYear = currentDate?.getFullYear() ?? 0;
                    const preDate = currentDate || new Date();
                    const preMonth = currentMonth - 1;
                    const preYear = currentYear;

                    const currentView = calendarApi?.view;
                    if (currentView?.type === 'dayGridMonth') {
                      calendarApi?.gotoDate(new Date(preYear, preMonth));
                    }
                    else if (currentView?.type === 'timeGridWeek') {   
                      preDate.setDate(preDate.getDate() - 7);
                      calendarApi?.gotoDate(preDate);
                    }
                    else{
                      preDate.setDate(preDate.getDate() - 1);
                      calendarApi?.gotoDate(preDate);
                    }

                    if(preDate.getMonth() !== preMonth) {
                      let new_Month = (preMonth+1).toString().length === 1 ? `0${preMonth+1}` : `${preMonth+1}`;
                      const new_Y = Number(new_Month) < 1 ? (preYear-1).toString(): preYear.toString();
                      if(preMonth < 0 )  new_Month = '12';
                      setMonth(new_Month);
                      setYear(new_Y.toString());
                    }
                  }
                }
              }}
              headerToolbar= {{
                left: 'preButton,nextButton',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              weekends={true}
              eventClick = {handleReadModalToggle}
              events={evtState}
            />
          </CalendarBody>
          <TaskBody>
            <TodoList>
              <Subheading>해야할 일</Subheading>
              { scheduleList.length > 0 ?
                scheduleList.map((el) => {
                  const {title,dday} = el;
                  return <TodoTask key={uuidv4()}><span>{title}</span><Dday>D{dday}</Dday></TodoTask>
                })
                : <p>해야할 일이 없습니다.</p>
              }
            </TodoList>

            <CompleteList>
              <Subheading>완료한 일</Subheading>
            </CompleteList>
          </TaskBody>
        </CalendarDiv>

        {/* 일정등록모달 */}
        { postModal.personalPost && 
          <PersonalScheduleAdd 
            handleModalToggle={handlePostModalToggle}
            getApi={performGetRequest}
            date={[month,year]}
          /> }
        { postModal.subjectPost && 
          <SubjectScheduleAdd 
            handleModalToggle={handlePostModalToggle}
            getApi={performGetRequest}
            date={[month,year]}
            subjectList={subjectList} />
        }

        {/* 일정상세보기모달 */}
        { readModal.personalRead && 
          <PersonalScheduleDetail
            handleModalToggle={()=> setReadModal({...readModal, personalRead: !readModal.personalRead})}
            getApi ={performGetRequest}
            id = {id}
            date = {[month,year]}
            event = {evt}
          /> 
        }
        { readModal.subjectRead && 
          <SubjectDetailProf
            handleModalToggle={()=> setReadModal({...readModal, subjectRead : !readModal.subjectRead})}
            getApi ={performGetRequest}
            id = {id}
            date = {[month,year]}
            event = {evt}
            subjectList={subjectList}
          /> 
        }

        {/* 일정등록버튼 */}
        <RightAlign>
          <PostBtn type='button' btnName='subject' onClick={e => handlePostModalToggle('subject')}>과목일정등록하기</PostBtn>
          <PostBtn type='button' btnName='personal' onClick={e => handlePostModalToggle('personal')}>개인일정등록하기</PostBtn>
        </RightAlign>
        </Container>
        : <h1>Loading</h1>
      }
      </>
    )
}

export default Calendar;