import React, { useState } from 'react';
import ItemExpand from './ItemExpand';
import '../css/notes.css';

export default function Notes() {
  const [event, setEvent] = useState('');
  const [eventList, setEventList] = useState([]);
  const [expand, setExpand] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const currentEvent = event;
    const date = now.toLocaleDateString();
    const id = now.getTime() + currentEvent.split(' ').join('');

    const list = [...eventList];
    const item = { id, event, dates: [date] };

    list.unshift(item);
    setEventList(list);
    setEvent('');
  };

  const handleUpdate = (id) => {
    const list = [...eventList];
    const index = list.findIndex((i) => i.id === id);
    const item = list[index];

    const date = new Date().toLocaleDateString();
    item.dates.unshift(date);
    list.splice(index, 1);
    setEventList([item, ...list]);
  };

  const handleExpand = (id) => {
    if (!expand) setExpand(true);
    else setExpand(false);
    const list = [...eventList];
    const item = list.filter((i) => i.id === id);
    setCurrentItem(item[0]);
  };

  return (
    <div className="main">
      <h1>Last Event Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="event"
          value={event}
          onChange={(e) => setEvent(e.currentTarget.value)}
        />
        <button>Add Event</button>
      </form>

      <div>
        <h3>Events</h3>
        <div>
          {eventList.map((e, i) => (
            <div key={i}>
              <button onClick={() => handleExpand(e.id)}>
                {expand && currentItem.id === e.id ? '-' : '+'}
              </button>{' '}
              {e.event} ({e.dates.length}) -{e.dates[0]}
              <button onClick={() => handleUpdate(e.id)}>Update</button>
              {expand && currentItem.id === e.id && (
                <ItemExpand item={currentItem} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
