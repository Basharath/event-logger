import React from 'react';

export default function Modal({ onYes, modal, handleModal }) {
  return (
    <div
      className="modal-background"
      style={modal ? { display: 'block' } : { display: 'none' }}
      onClick={() => handleModal(false)}
    >
      <div className="modal-container">
        <div className="modal">
          <p>Do you really want to remove this event log?</p>
          <button onClick={onYes} className="btn btn-yes">
            Yes
          </button>
          <button onClick={() => handleModal(false)} className="btn btn-no">
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
