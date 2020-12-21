import React from 'react';

export default function ItemExpand({ item }) {
  return (
    <div>
      {item.dates.slice(1).map((i, ind) => (
        <div key={ind}>{i}</div>
      ))}
    </div>
  );
}
