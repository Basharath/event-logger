export function getFormattedDate(date) {
  const now = new Date(date);
  const arr = now.toString().split(' ');
  const dateString = arr[1] + ' ' + arr[2] + ', ' + arr[3];
  const dayString = arr[0];
  const timeString = now.toLocaleTimeString();

  return dateString + ' ' + dayString + ' ' + timeString;
}

export function getSorted(list, param1, param2) {
  if (param2 !== undefined)
    list.sort((a, b) => (a[param1][param2] > b[param1][param2] ? 1 : -1));
  else list.sort((a, b) => (a[param1] > b[param1] ? 1 : -1));
  return list;
}

export function getStorage(key) {
  const items = localStorage.getItem(key);
  return JSON.parse(items);
}

export function setStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}
