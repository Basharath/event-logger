import React from 'react';

import ListItem from './ListItem';

export default function EventsList({ list }) {
  return (
    <div className="event-list">
      {list.map((event, index) => (
        <ListItem key={index} eventItem={event} />
      ))}
    </div>
  );
}
