import React, { useContext } from 'react';

import ItemExpand from './ItemExpand';
import { EventContext } from './EventLogger';

export default function ListItem({ eventItem }) {
  const { handleUpdate, handleExpand, currentItem, expand } = useContext(
    EventContext
  );
  const { id, event, dates } = eventItem;
  const isExpand = expand && currentItem.id === id;
  return (
    <>
      <div className={'event-item' + (isExpand ? ' expand' : '')}>
        <span className="event-name" onClick={() => handleExpand(id)}>
          {event}
        </span>
        <span className="event-date" onClick={() => handleExpand(id)}>
          {dates[0].slice(0, 12)}
        </span>
        <i
          className={'expand-icon fas fa-eye' + (isExpand ? '-slash' : '')}
          onClick={() => handleExpand(id)}
        ></i>
        <span className="event-number" title="Current log count">
          {dates.length}
        </span>
        <button
          onClick={() => handleUpdate(id)}
          className="btn btn-update"
          title="Click to log now"
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="event-dates-container">{isExpand && <ItemExpand />}</div>
    </>
  );
}
