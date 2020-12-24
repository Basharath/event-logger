import React, { useState, createContext, useEffect } from 'react';

import InputForm from './InputForm';
import SortColumns from './SortColumns';
import List from './List';
import Modal from './Modal';
import {
  getFormattedDate,
  getSorted,
  getStorage,
  setStorage,
} from '../utils/functions';
import Github from './Github';
import '../css/eventLogger.css';

export const EventContext = createContext();

export default function Notes() {
  const [event, setEvent] = useState('');
  const [eventList, setEventList] = useState([]);
  const [expand, setExpand] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [error, setError] = useState(false);
  const [permissionId, setPermissionId] = useState('');
  const [modal, setModal] = useState(false);
  const [mount, setMount] = useState(false);
  const [sort, setSort] = useState(false); //Setting to ascending

  useEffect(() => {
    if (!mount) {
      setMount(true);
      const list = getStorage('logger');
      if (!list) return;
      setEventList(list);
      setCurrentItem(list[0]);
    }
    setStorage('logger', eventList);
  }, [mount, eventList]);

  const handleSort = (param1, param2) => {
    const list = getSorted(eventList, param1, param2);

    const toggle = sort;
    if (sort) list.reverse();

    setSort(!toggle);

    setEventList(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    setError(false);

    const now = new Date();
    const date = getFormattedDate(now);
    const time = now.getTime();
    const id = time + event.split(' ').join('');

    const eventItem =
      event.slice(0, 1).toUpperCase() + event.slice(1).toLowerCase();

    const list = [...eventList];
    const item = { id, event: eventItem, dates: [date], time };

    list.unshift(item);
    if (!currentItem) setCurrentItem(item);
    setEventList(list);
    setEvent('');

    setStorage('logger', eventList);
  };

  const handleChange = ({ currentTarget }) => {
    setEvent(currentTarget.value);
    setError(false);
  };

  const handleModal = (value) => {
    setModal(value);
  };

  const handleUpdate = (id) => {
    const list = [...eventList];
    const index = list.findIndex((i) => i.id === id);
    const item = list[index];

    const now = new Date();
    const date = getFormattedDate(now);
    const time = now.getTime();
    item.dates.unshift(date);
    item.time = time;
    list.splice(index, 1, item);
    setEventList(list);
  };

  const handleExpand = (id) => {
    const toggle = !expand;
    const list = [...eventList];
    const item = list.filter((i) => i.id === id)[0];

    if (currentItem.id === id) {
      setExpand(toggle);
    } else {
      setExpand(true);
      setCurrentItem(item);
    }
  };

  const handleDateChange = (id, index, date) => {
    if (!date) return;
    const list = [...eventList];
    const itemIndex = list.findIndex((i) => i.id === id);
    const item = list[itemIndex];
    item.dates[index] = getFormattedDate(date);
    if (!index) item.time = new Date(date).getTime();

    list.splice(itemIndex, 1, item);
    setEventList(list);
  };

  const handleRemove = (id, index) => {
    const list = [...eventList];
    const itemIndex = list.findIndex((i) => i.id === id);
    const item = list[itemIndex];

    if (index !== undefined && item.dates.length > 1) {
      item.dates.splice(index, 1);
      list.splice(itemIndex, 1, item);
      setEventList(list);
    } else {
      setModal(true);
      setPermissionId(itemIndex);
    }
  };

  const deleteList = () => {
    const list = [...eventList];
    const index = permissionId;
    list.splice(index, 1);

    setPermissionId('');
    setEventList(list);
  };

  return (
    <EventContext.Provider
      value={{
        handleRemove,
        handleUpdate,
        handleExpand,
        currentItem,
        expand,
        handleDateChange,
      }}
    >
      <Github github="https://github.com/Basharath/event-logger" />
      {/* <div className="bar"></div> */}
      <div className="main">
        <h1>Event logger</h1>
        <InputForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          event={event}
          error={error}
        />

        <h2>Events</h2>
        <SortColumns handleSort={handleSort} />
        <List list={eventList} />

        <Modal onYes={deleteList} handleModal={handleModal} modal={modal} />
      </div>
    </EventContext.Provider>
  );
}
