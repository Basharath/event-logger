import React, { useContext, useState } from 'react';
import EditDate from './EditDate';

import { EventContext } from './EventLogger';

export default function ItemExpand() {
  const [edit, setEdit] = useState(false);
  const [itemIndex, setItemIndex] = useState('');
  const [mousePosition, setMousePosition] = useState('');
  const { handleRemove, currentItem: item } = useContext(EventContext);

  const handleDateClick = (e, index) => {
    const toggle = !edit;
    const y = window.pageYOffset;
    const mouse = { left: e.clientX - 50, top: e.clientY + y - 80 };
    setMousePosition(mouse);
    setItemIndex(index);
    setEdit(toggle);
  };
  return (
    <div className="event-dates-block">
      {item.dates.map((i, index) => (
        <div key={index} className="event-dates-item">
          <span>{item.dates.length - index}</span>
          <span className="date-item">{i}</span>
          <span className="change-event-date">
            <i
              className="fas fa-edit"
              onClick={(e) => handleDateClick(e, index)}
            ></i>
            {edit && (
              <EditDate id={item.id} index={itemIndex} styles={mousePosition} />
            )}
          </span>
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
