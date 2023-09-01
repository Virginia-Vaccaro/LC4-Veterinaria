import {useState} from 'react';
import Calendar from 'react-calendar';

const time = ['09:00','09:30','10:00','10:30','16:00', '16:30','17:00', '17:30','18:00']

const Times = (props) => {

    const [event, setEvent] = useState(null)
    const [info, setInfo] = useState(false)
   
    function displayInfo(e) {
      setInfo(true);
      setEvent(e.target.innerText);
   }

  return (
        <div className="times">
        {time.map(times => {
             return (
            <div>
                  <button onClick={(e)=> displayInfo(e)}> {times} </button>
            </div>
                )
             })}
            <div>
             {info ? <div>`Turno seleccionado para: {props.date.toDateString()} {event} hs.` <button>Confirmar Turno</button>
             
                </div>
              : null}
            </div>
        </div>
  )
}

export default Times
