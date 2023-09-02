import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Diary.css";

//A = Activado
//B = Desactivado
const dateAndHours = {
  "2023-09-04": ["08:00-A", "10:00-D", "14:00-D"],
  "2023-09-07": ["09:00-A", "15:00-A"],
  "2023-09-22": ["10:00-A", "14:00-A", "15:00-D"],
};

const Diary = ({icon}) => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);

  const tileDisabled = ({ date }) => {
    const enabledMonth = 8; // Mes permitido // El índice comienza de 0.
    const enabledDays = [4, 7, 22]; // Días permitidos

    const isToday = date.toDateString() === today.toDateString();
    const isPast = date < today;

    return (
      date.getMonth() !== enabledMonth ||
      !enabledDays.includes(date.getDate()) ||
      isPast ||
      isToday
    );
  };

  const handleDayClick = (selectedDate) => {
    const dateString = selectedDate.toISOString().split("T")[0];
    setSelectedTime(null);
    setDate(selectedDate);
    if (dateAndHours.hasOwnProperty(dateString)) {
      //Buscar la primera hora que termine con -A(activa)
      const firstAvailableHour = dateAndHours[dateString].find((times) => times.endsWith("-A"));
      //Poner en selectedTime la primera hora activa, caso contrario se dejara en null, esto para que no seleccione un valor por defecto que este deshabilitado.
      //Si se deja en null no se van a mostrar horarios disponibles directamente.
      setSelectedTime(firstAvailableHour.split("-")[0]);
    } else {
      setSelectedTime(null); 
    }
  };

  const handleRegisterClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      const turno = {
        fecha: date.toDateString(),
        hora: selectedTime,
      };
      const turnoJSON = JSON.stringify(turno);

      setMessage("Turno registrado correctamente✅");
      localStorage.setItem("turno", turnoJSON)

      setIsLoading(false);
    }, 2000);
  };



  return (
    <div className="diary">
      <h1 className="text-3xl font-bold text-dark-600 mb-2">{icon}Agende su turno aquí</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDayClick} value={date} tileDisabled={tileDisabled}/>
      </div>
      

      {selectedTime !== null && !message && (
        <div>
          <h2>Selecciona una hora:</h2>
          <ul>
          {dateAndHours[date.toISOString().split("T")[0]].map((times, index) => {
            //Verificar que el turno este deshabilitado o no.
            const [time, availability] = times.split("-");
            const isAvailable = availability === "A";

            return (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="selectedTime"
                    value={time}
                    checked={selectedTime === time}
                    onChange={() => setSelectedTime(time)}
                    disabled={!isAvailable}
                  />
                  {time}
                </label>
              </li>
            );
          })}
          </ul>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <><p className="italic">Dia y hora seleccionada: {date.toDateString()} {selectedTime}</p><button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegisterClick}>Confirmar Turno</button></>
          )}
        </div>
      )}

      {message && <p className="font-semibold mt-3 ">{message}</p>}
    </div>
  );
};

export default Diary;
