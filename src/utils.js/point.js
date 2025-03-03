import dayjs from 'dayjs';

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

const durationOfTrip = (timeA, timeB) => {
  const durationInMinutes = Math.ceil((dayjs(timeB).diff(dayjs(timeA))) / 60000);
  const hours = Math.floor(durationInMinutes / 60);
  const day = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  const minutes = durationInMinutes % 60;

  if(day >= 1) {
    return `${String(day)}D ${String(remainingHours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (hours > 0){
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else {
    return `${String(minutes).padStart(2, '0')}M`;
  }
};

const sortPointByDay = (pointA, pointB) => new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
const sortPointByTime = (pointA, pointB) => (new Date(pointB.dateTo) - new Date(pointB.dateFrom)) - (new Date(pointA.dateTo) - new Date(pointA.dateFrom));
const sortPointByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {humanizeDate, durationOfTrip, sortPointByDay, sortPointByTime, sortPointByPrice};
