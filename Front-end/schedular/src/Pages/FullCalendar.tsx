import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: 'event 1', date: '2023-05-01' },
          { title: 'event 2', date: '2023-05-02' }
        ]}
      />
    )
  }
}