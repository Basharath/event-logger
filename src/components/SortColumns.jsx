import React from 'react';

export default function SortColumns({ handleSort }) {
  return (
    <div className="sort-column">
      <span onClick={() => handleSort('event')}>
        Event <i className="fas fa-sort"></i>
      </span>
      <span onClick={() => handleSort('time')}>
        Time <i className="fas fa-sort"></i>
      </span>
      <span onClick={() => handleSort('dates', 'length')}>
        Count <i className="fas fa-sort"></i>
      </span>
    </div>
  );
}
