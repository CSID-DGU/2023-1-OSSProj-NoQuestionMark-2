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
import SubjectDetail from 'Components/SubjectDetail';
import { Events,EventSourceInput } from 'interfaces/CalendarState';
import { subjects, schedules, Schedules } from 'interfaces/homeSchedule';
import Icon from 'Assets/Images/check.png';
import { useRecoilState } from 'recoil';
import { EventState } from 'recoil/Atom';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineBorder, AiOutlineCheckSquare, AiOutlineDownCircle } from 'react-icons/ai';
import moment from 'moment';
import * as Api from 'lib/Api';
import { string } from 'yup';

const Container = styled.div`
  width : 80%;
  margin : 3rem auto 5rem;
`;
const Filter = styled.div`
  display : flex;
  flex-direction : column;
  align-content: flex-end
  
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
  background-color : ${props => props.btnName === 'personal'? 'orange':'#6ED746' };
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
const TaskBodyStyle= styled.div`
  text-align: left;
  padding-left: 1rem;
  border-radius: 5px;
  border: 2px solid #c9b087;
`
const TodoList = styled(TaskBodyStyle)`
  height: 60%;
`;
const CompleteList = styled(TaskBodyStyle)`
  margin-top: 1rem;
  height : 37%;
`
const TodoTask = styled.div`
  display: flex;
  justify-content: space-between;
  border: 0;
  background-color: transparent;
  margin-top: 0.5rem;
`;

const Subheading = styled.p`
  display: block;
  margin: 0.7rem 1rem 1.5rem 0;
  background-color:#c9b087;
  border-radius : 0.5rem;
  height: 2rem;
  color:white;
  text-align: center;
  font-weight: 600;
  vertical-align: middle;
  padding-top:0.5rem;
`
const Dday = styled.div`
  background-color: #12314f;
  color: #fff;
  border-radius: 0.5rem;
  margin-right: 1.5rem;
  font-size: 0.5rem;
  text-align: center;
  padding : 0.2rem 0;
  width: 2.5rem;
  height: 1rem;
`
const MainFilter = styled.div`
  display:flex;
  justify-content : flex-end;
`
const RightAlign = styled.div`
  display:flex;
  justify-content : flex-end;
  margin-top : 2rem;
`;
const PostBtns =styled(RightAlign)``
const SubFilter = styled(RightAlign)`
  margin-bottom: 2rem;
`
const RestoreBtn = styled.button`
  background-color: #A69D8F;
  border:none;
  border-radius: 0.5rem;
  margin-right: 1.5rem;
  padding: 0.05rem 0.02rem;
  width: 5rem;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  text-align: center;
`
const TaskTitle = styled.span`
  display:block;
  width:80%;
  margin-left: 0.5rem;
  tex-align: left;
`
const CompleteTitle = styled(TaskTitle)`
  text-decoration: line-through;
  color:#737373;
`
const TaskIconConatiner = styled.div`
  padding-top: 0.1rem;
`
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnName: string;
}

// memo지혜 : 중요도 배열
const IMPORTANCE = ['EASYGOING','NORMAL','IMPORTANT'];
// memo지혜 : 불토명도 배열
const ALPHA = [0.3, 0.6, 0.9];
// memo지혜 : 오늘을 기점으로 month 반환
const getTodayMonth = () => {
  const Tmonth = String(new Date().getMonth()+1);
  if(Tmonth.length === 1 ) { return `0${Tmonth}`}
  return Tmonth;
}
// memo지혜 : 오늘을 기점으로 year반환
const getTodayYear = () => {
  return String(new Date().getFullYear());
}

const Calendar = () =>{
  // memo지혜 : 과목명 상태관리
  const [subjectList, setSubjectList] =useState<string[]>([]);
  // memo지혜 : 해야 할 일 상태관리
  const [taskList, setTaskList] = useState<Schedules>([]);
  // memo지혜 : 완료한 일 상태관리
  const [completeList, setCompleteList] = useState<Schedules>([]);
  // memo지혜 : 모달 상태관리
  const [postModal, setpostModal] = useState({ personalPost: false, subjectPost: false});
  const [readModal, setReadModal] = useState({ personalRead: false, subjectRead: false});
  // memo지혜 : 선택된 일정에 대한 상태관리
  const [evt, setEvents] = useState<EventSourceInput>();
  const [id, setId] = useState('');
  // memo지혜 : month와 year에 대한 상태관리
  const [month, setMonth] = useState(getTodayMonth);
  const [year, setYear] = useState(getTodayYear);
  // memo지혜 : 전체 일정에 대한 상태관리
  const [evtState,setEvtState]= useRecoilState(EventState);
  const calendarRef = useRef<FullCalendar>(null);
  // memo지혜 : 필터
  const [mainFilter, setMainFilter] =useState('ALL');
  const [subFilter, setSubFilter] =useState('ALL');

  useEffect(() =>{
    (async () => {
      try {
        // memo지혜 : 일정관리에 필요한 GET request
        await performGetRequest(year,month);
        // memo지혜 : 개인과목일정 등록을 위한 과목명 상태관리
        await Api.get('/home').then((res)=>{
          const {subjects} = res.data.result;          
          setSubjectList([...subjects.map((el:subjects)=> el.subjectName)]);
        });
      } catch (error) {
        console.error(error);
      }
    })();
  },[year,month])

  useEffect(()=>{
  (async () =>{
    const visitedMonth = `${year}-${month}`;
    if (mainFilter === 'ALL'){
      reloadCalendarEvents(year, month); 
      return;
    }
    await Api.get(`/schedule/select?schedule=${mainFilter}&month=${visitedMonth}`).then((res)=> {
      const filteringResult:Events = res.data.result;

      filteringResult.forEach((s: EventSourceInput) => {
        if (s.schedule === 'COMMON') {
          const idx = IMPORTANCE.indexOf(s.importance);
          s['color'] = `rgba(255,0,0,${ALPHA[idx]})`;
          s.scheduleType === 'TASK' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
        } else if (s.schedule === 'SUBJECT') {
          const idx = IMPORTANCE.indexOf(s.importance);
          s['color'] = `rgba(0,255,0,${ALPHA[idx]})`;
          s.scheduleType === 'TASK' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
        } else {
          s['color'] = `rgba(0,0,255,1.0)`;
          s.scheduleType === 'ASSIGNMENT' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
        }
      });

      setEvtState([...filteringResult.map((event:EventSourceInput) =>({
        ...event,
        'start': event.startDate,
        'end': event.endDate
      }))]);
    })
  })();
  }, [mainFilter, year, month]);
  
  useEffect(()=>{
    (async () =>{
      const visitedMonth = `${year}-${month}`;

      if(subFilter === 'ALL') return;
      await Api.get(`/schedule/select/subject?subject=${subFilter}&month=${visitedMonth}`).then((res)=>{
        const filteringResult:Events = res.data.result;
        filteringResult.forEach((s: EventSourceInput) => {
          if(s.schedule === 'SUBJECT'){
            const idx = IMPORTANCE.indexOf(s.importance);
            s['color'] = `rgba(0,255,0,${ALPHA[idx]})`;
            s.scheduleType === 'TASK' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
          } else {
            s['color'] = `rgba(0,0,255,1.0)`;
            s.scheduleType === 'ASSIGNMENT' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
          }
        });

        setEvtState([...filteringResult.map((event:EventSourceInput) =>({
          ...event,
          'start': event.startDate,
          'end': event.endDate
        }))]);
      })
    })();
  }, [subFilter, year, month]);

  const performGetRequest = async (year: string, month: string) => {
    try { 
      // memo지혜 : 캘린더 일정 GET request 함수
      reloadCalendarEvents(year, month);    
      // memo지혜 : 해야 할 일과 완료 한 일에 대한 일정 GET request 함수
      reloadTaskList();
      setMainFilter('ALL');
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };
  
  const reloadCalendarEvents =async (year:string, month:string) => {
    const visitedMonth = `${year}-${month}`;

    const response = await Api.get(`/schedule/common?month=${visitedMonth}`);
    // memo지혜 : 일정은 개인일정, 과목개인일정, 공식일정으로 구성 
    const {commonSchedule,subjectSchedule,officialSchedule} = response.data.result;

    // memo지혜 : 중요도에 따른 불투명도 설정 및 TASK일 경우 아이콘 부여
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
      s.scheduleType === 'ASSIGNMENT' ? (s['imageurl'] = Icon) : (s['imageurl'] = '');
    });

    const newEventList = [...commonSchedule, ...subjectSchedule,...officialSchedule];  
    setEvtState([...newEventList.map(event =>({
      ...event,
      'start': event.startDate,
      'end': event.endDate
    }))]); 
  }

  const reloadTaskList = async() => {
    await Api.get('/schedule/toDoList').then((res)=>{
      const result = res.data.result;
      setTaskList([
        ...result
        .filter((task:schedules) => task.complete === 'FALSE')
        .map((el:schedules)=> { return {'title': el.title,'dday': el.dday, 'scheduleId' : el.scheduleId, 'schedule' : el.schedule}})
      ]);

      setCompleteList([
        ...result
        .filter((task:schedules) => task.complete === 'TRUE')
        .map((el:schedules)=> { return {'title': el.title,'dday': el.dday, 'scheduleId' : el.scheduleId, 'schedule' : el.schedule}})
      ])
    });
  }

  // memo지혜 : 일정등록 모달 toggle 함수
  const handlePostModalToggle = (type:string) => {
    type==='personal' ?
    setpostModal({...postModal, personalPost: !postModal.personalPost})
    :setpostModal({...postModal, subjectPost : !postModal.subjectPost})
  }

  // memo지혜 : 일정상세조회 모달 toggle 함수
  const handleReadModalToggle = (info:any) => {
    // memo지혜 : 일정에 대한 데이터는 fullcalendar의 일정을 클릭했을 때 해당 일정에 대한 데이터 info로 얻어옴 
    let {_def} = info.event;
    let title = _def.title;
    let className = _def.ui.classNames[0];
    let {contents,startDate, endDate, scheduleId, importance, schedule, scheduleType, subjectScheduleType} = _def.extendedProps;
    // memo지혜 : 선택된 일정에 대한 아이디 상태관리 for 수정과 삭제 요청시 사용
    setId(scheduleId);
    // memo지혜 : 개인 일정 경우, 일정에 대한 데이터와 모달 상태관리
    if(schedule === 'COMMON'){
      setEvents({title,contents, startDate, endDate, importance, schedule, scheduleType});
      setReadModal({...readModal, personalRead: !readModal.personalRead})
    }
    // memo지혜 : 개인 과목일정 또는 공식일정 일 경우, 일정에 대한 데이터와 모달 상태관리
    else {
      setEvents({title,contents,startDate, endDate, importance, className, subjectScheduleType, schedule, scheduleType});
      setReadModal({...readModal, subjectRead : !readModal.subjectRead})
    }
  }
  // memo지혜 : 캘린더에서 일정이 보이는 뷰를 설정하는 함수
  const eventContent = (arg:any) => {
    const backgroundColor = arg.backgroundColor;
    const { title } = arg.event;
    const { imageurl, complete, startDate, endDate} = arg.event.extendedProps;

    return (
      <div className='event'>
        { imageurl && <AiOutlineDownCircle />}  
        {  moment(endDate).diff(moment(startDate), 'days') === 0 
            ? <div style={{display:'flex'}}><div style={{borderRadius: '50%',width: '10px', height: '10px',backgroundColor:backgroundColor}}></div><span>{title}</span></div>
            :<span className='event-title' style={{textDecoration: (complete === 'TRUE' ? 'line-through' : 'none')}}>{title}</span>
        }      
      </div>
    );
  };
  // memo지혜: 마우스 클릭시 complete속성을 변경하는 POST request 함수
  const handleComplete = async(scheduleId:string, schedule:string) =>{
    await Api.post(`/complete/${scheduleId}`,schedule).then((res) => {
      performGetRequest(year, month);
      alert('복원완료');
    });
  }

  const openModal= async(id:string) => {
    await Api.get(`/schedule/${id}`).then(res => {
      const {title, contents, startDate, endDate, importance, scheduleType, className, subjectScheduleType, schedule} = res.data.result;
      setId(id);
  
      if(schedule === 'COMMON'){
        setEvents({title,contents, startDate, endDate, importance, schedule, scheduleType});
        setReadModal({...readModal, personalRead: !readModal.personalRead})
      }
      else{
        setEvents({title,contents, startDate, endDate, importance, className, subjectScheduleType, schedule, scheduleType});
        setReadModal({...readModal, subjectRead : !readModal.subjectRead})
      }
    })
  };

  const handleMainFilter = async() => {
    const mainSelect = document.getElementById('mainfilter') as HTMLSelectElement;
    const scheduleType = mainSelect?.options[mainSelect?.selectedIndex].value;
    setMainFilter(scheduleType);
  }
  const handleSubFilter = async() => {
    const subSelect = document.getElementById('subfilter') as HTMLSelectElement;
    const subjectName = subSelect?.options[subSelect?.selectedIndex].value;
    setSubFilter(subjectName);
  }

  return (
    <>
      { evtState ? 
      <Container>
        <Filter>
          {/* 일정 유형별 필터링 하는 기능 */}
          <MainFilter>
            <select name='filter' id='mainfilter' value={mainFilter} onChange={handleMainFilter}>
              <option value='ALL'>--전체보기--</option>
              <option value='SUBJECT'>과목일정보기</option>
              <option value='COMMON'>개인일정보기</option>
            </select>
          </MainFilter>
          <SubFilter>
            {
              mainFilter === 'SUBJECT' && 
              <select name='detail-filter' id='subfilter' value={subFilter} onChange={handleSubFilter}>
                <option value='ALL'>--전체보기--</option>
                {
                  subjectList.map((subject) => <option key={uuidv4()} value={subject}>{subject}</option>)
                }
              </select>
            }
          </SubFilter>
        </Filter>
    
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
                    // memo지혜: 월 이동 
                    if (currentView?.type === 'dayGridMonth') {
                      calendarApi?.gotoDate(new Date(nextYear, nextMonth));
                    }
                    // memo지혜: 주 이동 
                    else if (currentView?.type === 'timeGridWeek') {                      
                      nextDate.setDate(nextDate.getDate() + 7);
                      calendarApi?.gotoDate(nextDate);
                    }
                    // memo지혜: 일 이동 
                    else{
                      nextDate.setDate(nextDate.getDate() + 1);
                      calendarApi?.gotoDate(nextDate);
                    }

                    // memo지혜 : 날짜 이동을 결과 월이 바뀌었다면 month와 year을 업데이트
                    if(currentView?.type === 'dayGridMonth'){
                      if( nextDate.getMonth() !== nextMonth){
                        let new_M = (nextMonth+1).toString().length === 1 ? `0${nextMonth+1}` : `${nextMonth+1}`;
                        const new_Y = Number(new_M)>12 ? (nextYear+1).toString(): nextYear.toString();
                        if(nextMonth >= 12)  new_M = '01';
                        setMonth(new_M);
                        setYear(new_Y);
                      }
                    }
                    else{
                      if( nextDate.getMonth() === nextMonth){
                        let new_M = (nextMonth+1).toString().length === 1 ? `0${nextMonth+1}` : `${nextMonth+1}`;
                        const new_Y = Number(new_M)>12 ? (nextYear+1).toString(): nextYear.toString();
                        if(nextMonth >= 12)  new_M = '01';
                        setMonth(new_M);
                        setYear(new_Y);
                      }
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

                    if(currentView?.type === 'dayGridMonth'){
                      if(preDate.getMonth() !== preMonth) {
                        let new_Month = (preMonth+1).toString().length === 1 ? `0${preMonth+1}` : `${preMonth+1}`;
                        const new_Y = Number(new_Month) < 1 ? (preYear-1).toString(): preYear.toString();
                        if(preMonth < 0 )  new_Month = '12';
                        setMonth(new_Month);
                        setYear(new_Y.toString());
                      }
                    }
                    else{
                      if( preDate.getMonth() === preMonth){
                        let new_M = (preMonth+1).toString().length === 1 ? `0${preMonth+1}` : `${preMonth+1}`;
                        const new_Y = Number(new_M)>12 ? (preYear+1).toString(): preYear.toString();
                        if(preMonth >= 12)  new_M = '01';
                        setMonth(new_M);
                        setYear(new_Y);
                      }
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
              { taskList.length > 0 ?
                taskList.map((el) => {
                  const {title,dday,scheduleId} = el;
                  return <TodoTask key={uuidv4()} onClick={()=>openModal(scheduleId)}>
                    <TaskIconConatiner><AiOutlineBorder /></TaskIconConatiner>
                    <TaskTitle>{title}</TaskTitle>
                    <Dday><span>D{dday}</span></Dday>
                  </TodoTask>
                })
                : <p>해야할 일이 없습니다.</p>
              }
            </TodoList>

            <CompleteList>
              <Subheading>완료한 일</Subheading>
              { completeList.length > 0 ?
                completeList.map((el) => {
                  const {title,scheduleId,schedule} = el;
                  return (
                    <TodoTask key={uuidv4()}>
                      <TaskIconConatiner><AiOutlineCheckSquare /></TaskIconConatiner>
                      <CompleteTitle>{title}</CompleteTitle>
                      <RestoreBtn onClick={()=>handleComplete(scheduleId,schedule)}>복원하기</RestoreBtn>
                    </TodoTask>)
                })
                : <p>완료한 일이 없습니다.</p>
              }
            </CompleteList>
          </TaskBody>
        </CalendarDiv>

        {/* memo지혜 : 일정등록모달 */}
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
            subjectList={subjectList} 
          />
        }

        {/* memo지혜 : 일정상세보기모달 */}
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
          <SubjectDetail
            handleModalToggle={()=> setReadModal({...readModal, subjectRead : !readModal.subjectRead})}
            getApi ={performGetRequest}
            id = {id}
            date = {[month,year]}
            event = {evt}
            subjectList={subjectList}
          /> 
        }

        {/* memo지혜 : 일정등록버튼 */}
        <PostBtns>
          <PostBtn type='button' btnName='subject' onClick={e => handlePostModalToggle('subject')}>과목일정등록하기</PostBtn>
          <PostBtn type='button' btnName='personal' onClick={e => handlePostModalToggle('personal')}>개인일정등록하기</PostBtn>
        </PostBtns>
        </Container>
        : <h1>Loading</h1>
      }
      </>
    )
}

export default Calendar;