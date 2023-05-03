import React from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import SubjectScheduleAdd from 'Components/SubjectScheduleAdd';
import PersonalScheduleAdd from 'Components/PersonalScheduleAdd';

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

interface ModalState {
  personal: boolean
  subject: boolean
}
export type Props = {
  handleModalToggle: (value: string) => void;
}
export default class Calendar extends React.Component {

  state: ModalState =  {
    personal: false,
    subject: false
  }

  render() {
    return (
      <Container>
        
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
          events={[
            { title: 'event 1', date: '2023-05-01' },
            { title: 'event 2', date: '2023-05-02' }
          ]}
        />
        { this.state.personal && <PersonalScheduleAdd handleModalToggle={this.handleModalToggle}/> }
        { this.state.subject && <SubjectScheduleAdd handleModalToggle={this.handleModalToggle}/> }
        
        <RightAlign>
          <PostBtn type='button' onClick={e => this.handleModalToggle('subject')}>과목일정등록하기</PostBtn>
          <PostBtn type='button' onClick={e => this.handleModalToggle('personal')}>개인일정등록하기</PostBtn>
        </RightAlign>
        
      </Container>
    )
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
}