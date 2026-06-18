export default function convertHourToMinutes(time: string | number) {
  if (typeof time === 'number') {
    return time;
  }

  const [hour, minutes] = time.split(':').map(Number);

  return hour * 60 + minutes;
}
