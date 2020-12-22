import React, { useContext } from 'react';

import { EventContext } from './Notes';
import ListItem from './ListItem';

export default function EventsList({ list }) {
  const {
    currentItem,
    expand,
    handleExpand,
    handleUpdate,
    handleRemove,
  } = useContext(EventContext);
  return (
    <div className="event-list">
      {list.map((event, index) => (
        <ListItem
          key={index}
          eventItem={event}
          currentItem={currentItem}
          expand={expand}
          onExpand={handleExpand}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}
