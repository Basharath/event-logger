import React, { useState, useContext } from 'react';

import { EventContext } from './EventLogger';

export default function EditDate({ styles, id, index }) {
  const [date, setDate] = useState();
  const [show, setShow] = useState(true);
  const { handleDateChange } = useContext(EventContext);
  function handleSubmit() {
    setShow(false);
    handleDateChange(id, index, date);
  }
  const maxDate = new Date().toISOString().slice(0, 10);
  return (
    <>
      {show && (
        <div className="calendar" style={styles}>
          <div className="calendar-form">
            <input
              type="datetime-local"
              onChange={({ currentTarget }) => setDate(currentTarget.value)}
              className="calendar-input"
              max={maxDate}
            />
            <button className="btn btn-calendar" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}
