import React, { useContext } from 'react';

import { EventContext } from './Notes';

export default function ItemExpand({ item }) {
  const { handleRemove } = useContext(EventContext);
  return (
    <div className="event-dates-block">
      {item.dates.map((i, index) => (
        <div key={index} className="event-dates-item">
          <span>{item.dates.length - index}</span>
          <span>{i}</span>
          <span
            className="event-date-remove"
            onClick={() => handleRemove(item.id, index)}
          >
            &times;
          </span>
        </div>
      ))}
      <div
        className="event-dates-remove-all"
        onClick={() => handleRemove(item.id)}
      >
        Delete all
      </div>
    </div>
  );
}
