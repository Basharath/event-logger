import React from 'react';

import ItemExpand from './ItemExpand';

export default function ListItem({
  eventItem,
  currentItem,
  onExpand,
  onUpdate,
  expand,
}) {
  const { id, event, dates } = eventItem;
  const isExpand = expand && currentItem.id === id;
  return (
    <>
      <div className="event-item" onClick={(e) => onExpand(e, id)}>
        <span className="event-name">{event}</span>
        <span className="event-date">{dates[0].slice(0, 10)}</span>
        <i
          className={'expand-icon fas fa-eye' + (isExpand ? '-slash' : '')}
          onClick={(e) => onExpand(e, id)}
        ></i>
        <span className="event-number" title="Current log count">
          {dates.length}
        </span>
        <button
          onClick={() => onUpdate(id)}
          className="btn btn-update"
          title="Click to log now"
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="event-dates-container">
        {isExpand && <ItemExpand item={currentItem} />}
      </div>
    </>
  );
}
