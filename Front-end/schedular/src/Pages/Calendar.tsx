import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import SubjectScheduleAdd from 'Components/SubjectScheduleAdd';
import PersonalScheduleAdd from 'Components/PersonalScheduleAdd';
import PersonalScheduleDetail from 'Components/PersonalScheduleDetail';
import SubjectDetailStudent from 'Components/SubjectDetailStudent';
import {Events,EventSourceInput} from 'interfaces/CalendarState';
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
const PostBtn = styled.button`
  &:first-child {
      margin-right : 1rem;
  }

  width : 8rem;
  height : 2rem;
`; 

const Calendar = () =>{

  const [postModal, setpostModal] = useState({ personalPost: false, subjectPost: false});
  const [readModal, setReadModal] = useState({ personalRead: false, subjectRead: false});
  const [evt, setEvents] = useState<Events>();
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState(String(new Date().getMonth()+1));

  useEffect (() => {
    _getEvents();
  },[]);

  useEffect (() => {
    console.log(evt);
  },[evt]);
  
  useEffect (() => {
    _getEvents();
  },[month]);

  const monthChange = () =>{
    let dateEl = document.querySelector('.fc-toolbar-chunk>h2');
    if( dateEl ){
      let [y,m] = dateEl.innerHTML.split(' ');
      y = y.slice(0,4);
      m = m.slice(0,-1);
      console.log(m,y);
      setMonth(m);
      setYear(y)
    }
  }

  const _getEvents = async () => {
    const events = await _axiosEvents(year,month);    
    setEvents(events.map(el => {return { ...el, 'start': el.startDate, 'end': el.endDate}}));
  }

  // axios의 get 메소드를 통해 Back-End의 url에 정보를 요청하고, 그에 따른 res.data 응답 리턴
  const _axiosEvents = async (year :string, month:string) => {
    return [
    {title:'test0', startDate : '2023-05-05', endDate:'2023-05-08', contents:'testing', scheduleType : 'task' ,importance:'중요도1'},
    {title:'test1', startDate : '2023-05-07', endDate:'2023-05-12', contents:'testing', scheduleType : '과제'}];
    /*
    return  await Api.get(`/calendar?year=${year}&month=${month}`).then(res => {
      const {commonSchedule,subjectSchedule} = res.data;
      commonSchedule.map((s:EventSourceInput) => s['type'] = 'personal');
      subjectSchedule.map((s:EventSourceInput) => s['type'] = 'subject');
      return [...commonSchedule, subjectSchedule];
    });
    */                  
  }

  // modal
  const handlePostModalToggle = (type:string) => {
    type === 'personal' && postModal.subjectPost === false?
    setpostModal({...postModal, personalPost: !postModal.personalPost})
    :setpostModal({...postModal, subjectPost : !postModal.subjectPost})
  }

  const handleReadModalToggle = (info:any) => {
    let {_def,_instance} = info.event;
    let {title} = _def;
    let {content, type} = _def.extendedProps;
    let {start, end } = _instance.range;

    type === 'personal' ?
    setReadModal({...readModal, personalRead: !readModal.personalRead})
    :setReadModal({...readModal, subjectRead : !readModal.subjectRead})
  }
  const handleEvents = async()=>{
    await monthChange();
    return evt;
  }
  return (
      <Container>
        { evt ? 
        <>
        <RightAlign>
          <select name='pets' id='pet-select'>
            <option value=''>--전체보기--</option>
            <option value='subject'>과목일정보기</option>
            <option value='personal'>개인일정보기</option>
          </select>
        </RightAlign>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin,interactionPlugin ]}
          initialView='dayGridMonth'
          locale={koLocale}
          headerToolbar= {{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          weekends={true}
          eventClick = {handleReadModalToggle}
          events={handleEvents}
        />
        
        { postModal.personalPost && <PersonalScheduleAdd handleModalToggle={handlePostModalToggle}/> }
        { postModal.subjectPost && <SubjectScheduleAdd handleModalToggle={handlePostModalToggle}/> }
        { readModal.personalRead && 
          <PersonalScheduleDetail
            handleModalToggle={()=> setReadModal({...readModal, personalRead: !readModal.personalRead})}
          /> 
        }
        { readModal.subjectRead && 
          <SubjectDetailStudent
            handleModalToggle={()=> setReadModal({...readModal, subjectRead : !readModal.subjectRead})}
          /> 
        }
        {/* 유저타입이 학생, 교수 구분 */}
        <RightAlign>
          <PostBtn type='button' onClick={e => handlePostModalToggle('subject')}>과목일정등록하기</PostBtn>
          <PostBtn type='button' onClick={e => handlePostModalToggle('personal')}>개인일정등록하기</PostBtn>
        </RightAlign>
        </>
        : <h1>Loading</h1>
      }
      </Container>
    )
}

export default Calendar;