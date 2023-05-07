import React from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import SubjectScheduleAdd from 'Components/SubjectScheduleAdd';
import PersonalScheduleAdd from 'Components/PersonalScheduleAdd';
import PersonalScheduleDetail from 'Components/PersonalScheduleDetail';
import {CalendarState} from 'interfaces/CalendarState';
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


export default class Calendar extends React.Component {

  state: CalendarState =  {
    personalPost: false,
    subjectPost: false,
    personalRead: false,
    subjectRead: false,
    events: []
  }

  // 아래의 모든 과정은 componentDidMount에 의해, 컴포넌트가 만들어지고 첫 렌더링을 모두 끝낸 후 실행됨
  componentDidMount() {
    this._getEvents();
  }

  // _axiosEvents이 응답을 받을때까지 기다리고, 응답을 받는다면 setState 메소드를 호출하여 state 값에 events라는 데이터를 넣어줌
  _getEvents = async () => {
    const events = await this._axiosEvents();
    console.log(events);
    this.setState({events : events});
  }

  // axios의 get 메소드를 통해 Back-End의 url에 정보를 요청하고, 그에 따른 res.data 응답 리턴
  _axiosEvents = async () => {
    return [{title:'test0', start : '2023-05-05', end:'2023-05-08', content:'testing', scheduleType : 'task', type: 'personal' ,importance:'중요도1'},
    {title:'test1', start : '2023-05-07', content:'testing', type: 'subject', scheduleType:'과제'}]
    //return  await Api.get('/').then(res => res.data);                  
  }
  
  handlePostModalToggle = (type:string) => {
    type === 'personal' && this.state.subjectPost === false?
    this.setState({
      personalPost: !this.state.personalPost
    })
    :this.setState({
      subjectPost : !this.state.subjectPost
    })
  }

  handleReadModalToggle = (info:any) => {
    // read 
    // 모달 열면서 데이터를 함께 넘겨줘야함// 아니면 id로 get요청을 받아와서 해야하나?
    // type에 따라 필요한 데이터가 달라짐. 데이터폼 설계하기
    // 중요도, 스케쥴타입 고려할 것
    
    let {_def,_instance} = info.event;
    let {title} = _def;
    let {content, type} = _def.extendedProps;
    let {startDate, endDate } = _instance.range;

    let dataForm = { "title": title, "content": content, "type": type, "startDate": startDate, "endDate": endDate };
    type==='personal' ?  this.setState({personalRead : !this.state.personalRead}) : this.setState({subjectRead : !this.state.subjectRead});
  }

  render() {
    let events = this.state.events; 
    return (
      <Container>
        { events ? 
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
          headerToolbar= {{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          weekends={true}
          events={ events}
          eventClick = {this.handleReadModalToggle}
        />
        
        { this.state.personalPost && <PersonalScheduleAdd handleModalToggle={this.handlePostModalToggle}/> }
        { this.state.subjectPost && <SubjectScheduleAdd handleModalToggle={this.handlePostModalToggle}/> }
        { this.state.personalRead && <PersonalScheduleDetail /> }
        
        <RightAlign>
          <PostBtn type='button' onClick={e => this.handlePostModalToggle('subject')}>과목일정등록하기</PostBtn>
          <PostBtn type='button' onClick={e => this.handlePostModalToggle('personal')}>개인일정등록하기</PostBtn>
        </RightAlign>
        </>
        : 'loading'}
      </Container>
    )
  }
}