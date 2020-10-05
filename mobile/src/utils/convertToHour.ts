export default function ConvertToDate(date: any): String {
  const hour = date / 60;

  let hourString = hour.toString();

  return `${hourString}h`;
}
