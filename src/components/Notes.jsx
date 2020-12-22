import React, { useState, createContext } from 'react';

import '../css/notes.css';
import EventsList from './EventsList';

export const EventContext = createContext();

export default function Notes() {
  const [event, setEvent] = useState('');
  const [eventList, setEventList] = useState([]);
  const [expand, setExpand] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [error, setError] = useState(false);
  const [permissionId, setPermissionId] = useState('');
  const [modal, setModal] = useState(false);
  const [sortby, setSortby] = useState('asc');

  function sort(param, rest) {
    const list = [...eventList];

    if (rest !== undefined)
      list.sort((a, b) => (a[param][rest] > b[param][rest] ? 1 : -1));
    else list.sort((a, b) => (a[param] > b[param] ? 1 : -1));

    if (sortby === 'dsc') list.reverse();

    setEventList(list);
    if (sortby === 'dsc') setSortby('asc');
    else setSortby('dsc');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event) {
      setError(true);
      return;
    }
    setError(false);

    const now = new Date();
    const currentEvent = event;
    const date = now.toLocaleString();
    const time = now.getTime();
    const id = now.getTime() + currentEvent.split(' ').join('');

    const list = [...eventList];
    const item = { id, event, dates: [date], time };

    list.unshift(item);
    setEventList(list);
    setEvent('');
  };

  const handleChange = ({ currentTarget }) => {
    setEvent(currentTarget.value);
    setError(false);
  };

  const handleUpdate = (id) => {
    const list = [...eventList];
    const index = list.findIndex((i) => i.id === id);
    const item = list[index];

    const now = new Date();
    const date = now.toLocaleString();
    const time = now.getTime();
    item.dates.unshift(date);
    item.time = time;
    list.splice(index, 1, item);
    setEventList(list);
  };

  const handleExpand = ({ target }, id) => {
    if (
      target.classList.contains('event-number') ||
      target.classList.contains('fa-plus')
    ) {
      return;
    }

    if (!expand) setExpand(true);
    else setExpand(false);

    const list = [...eventList];
    const item = list.filter((i) => i.id === id);
    setCurrentItem(item[0]);
  };

  const handleRemove = (id, index) => {
    console.log(index);
    const list = [...eventList];
    const itemIndex = list.findIndex((i) => i.id === id);
    const item = list[itemIndex];

    if (index !== undefined && item.dates.length > 1) {
      item.dates.splice(index, 1);
      list.splice(itemIndex, 1, item);
      console.log('inside');
    } else {
      console.log('outside');
      setModal(true);
      setPermissionId(itemIndex);
    }

    // setExpand(false);
    setEventList(list);
  };

  const deleteList = () => {
    const list = [...eventList];
    const index = permissionId;
    list.splice(index, 1);

    setPermissionId('');
    setEventList(list);
  };

  return (
    <EventContext.Provider
      value={{ handleRemove, handleUpdate, handleExpand, currentItem, expand }}
    >
      <div className="main">
        <h1>Event logger</h1>
        <form onSubmit={handleSubmit} className="event-form">
          {error && <small>Please add any event</small>}
          <input
            name="event"
            value={event}
            onChange={handleChange}
            className="eventInput"
            placeholder="e.g., haircut"
          />
          <button className="btn add-event">Add Event</button>
        </form>

        <h2>Events</h2>
        <div className="sort-column">
          <span onClick={() => sort('event')}>
            Event <i className="fas fa-sort"></i>
          </span>
          <span onClick={() => sort('time')}>
            Time <i className="fas fa-sort"></i>
          </span>
          <span onClick={() => sort('dates', 'length')}>
            Log count <i className="fas fa-sort"></i>
          </span>
        </div>
        <EventsList list={eventList} />
        <div
          className="modal-background"
          style={modal ? { display: 'block' } : { display: 'none' }}
          onClick={() => setModal(false)}
        >
          <div className="modal-container">
            <div className="modal">
              <p>Do you really want to remove the event log?</p>
              <button onClick={deleteList} className="btn btn-yes">
                Yes
              </button>
              <button
                onClick={() => setPermissionId('')}
                className="btn btn-no"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </EventContext.Provider>
  );
}
