import React from 'react';

export default function InputForm({
  handleSubmit,
  handleChange,
  event,
  error,
}) {
  return (
    <form onSubmit={handleSubmit} className="event-form">
      {error && <small>Please add any event</small>}
      <input
        name="event"
        value={event}
        onChange={handleChange}
        className="eventInput"
        placeholder="e.g., Haircut"
        maxLength="50"
        autoFocus
      />
      <button className="btn add-event">Add Event</button>
    </form>
  );
}
