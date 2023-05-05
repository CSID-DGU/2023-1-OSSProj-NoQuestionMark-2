import React from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import SubjectScheduleAdd from 'Components/SubjectScheduleAdd';
import PersonalScheduleAdd from 'Components/PersonalScheduleAdd';
import {CalendarState,Events} from 'interfaces/CalendarState';
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
    personal: false,
    subject: false,
    weekendsVisible: true,
    events: []
  }

  // 아래의 모든 과정은 componentDidMount에 의해, 컴포넌트가 만들어지고 첫 렌더링을 모두 끝낸 후 실행됨
  componentDidMount() {
    this._getEvents();
  }

  // _axiosEvents이 응답을 받을때까지 기다리고, 응답을 받는다면 setState 메소드를 호출하여 state 값에 events라는 데이터를 넣어줌
  _getEvents = async () => {
    const events:Events = await this._axiosEvents();
    console.log(events);
    this.setState({events : events});
  }

  // axios의 get 메소드를 통해 Back-End의 '/main' url에 정보를 요청하고, 그에 따른 res.data 응답 리턴
  _axiosEvents = async () => {
    return [{title:'test0', start : '2023-05-05'},{title:'test1', start : '2023-05-07'}]
    //return  await Api.get('/').then(res => res.data);                  
  }
  
  handleModalToggle = (type:string) => {
    type === 'personal' && this.state.subject === false?
    this.setState({
      personal: !this.state.personal
    })
    :this.setState({
      subject : !this.state.subject
    })
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
          weekends={this.state.weekendsVisible}
          events={events}
        />
        { this.state.personal && <PersonalScheduleAdd handleModalToggle={this.handleModalToggle}/> }
        { this.state.subject && <SubjectScheduleAdd handleModalToggle={this.handleModalToggle}/> }
        
        <RightAlign>
          <PostBtn type='button' onClick={e => this.handleModalToggle('subject')}>과목일정등록하기</PostBtn>
          <PostBtn type='button' onClick={e => this.handleModalToggle('personal')}>개인일정등록하기</PostBtn>
        </RightAlign>
        </>
        : 'loading'}
      </Container>
    )
  }
}