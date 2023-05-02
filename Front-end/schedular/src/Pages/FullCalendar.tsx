import React from 'react'
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Container = styled.div`
  width : 80%;
  margin : 3rem auto;
`;

export default class Calendar extends React.Component {
  render() {
    return (
      <Container>
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: 'event 1', date: '2023-05-01' },
            { title: 'event 2', date: '2023-05-02' }
          ]}
        />
      </Container>
    )
  }
}