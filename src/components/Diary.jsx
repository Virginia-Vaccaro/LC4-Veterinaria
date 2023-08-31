
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Diary.css';
import Time from './Time.jsx'


const Diary = () => {
    const [date, setDate] = useState(new Date())
    const [showTime, setShowTime] = useState(false)

  return (
    <div className="diary">
    <h1 className="title">Agenda tu turno aquí</h1>
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)}/>
    </div>

    {date.length > 0 ? (
   <p>
     <span>Start:</span>
     {date[0].toDateString()}
     &nbsp;
     &nbsp;
     <span>End:</span>{date[1].toDateString()}
   </p>
          ) : (
   <p>
      <span>Default selected date:</span>{date.toDateString()}
   </p> 
          )
   }
   <Time showTime={showTime} date={date}/>
  </div>
  );
};

export default Diary;



