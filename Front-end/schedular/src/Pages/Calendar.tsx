import React from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Container = styled.div`
  width : 80%;
  margin : 3rem auto;
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
  postSchedule(postType:string){
    alert(postType);
  };


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
        <RightAlign>
          <PostBtn type='button' onClick={e => this.postSchedule('subject')}>과목일정등록하기</PostBtn>
          <PostBtn type='button' onClick={e => this.postSchedule('personal')}>개인일정등록하기</PostBtn>
        </RightAlign>
      </Container>
    )
  }
}