import React from 'react'
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'

const Container = styled.div`
  width : 80%;
  margin : 3rem auto;
`;

export default class Calendar extends React.Component {
  render() {
    return (
      <Container>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin,interactionPlugin ]}
          initialView="dayGridMonth"
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
      </Container>
    )
  }
}