export default function covertHourToMinutes(timer: string) {
  const [hour] = timer.split('h').map(Number);

  const timeInMinutes = hour * 60;

  return timeInMinutes;
}
