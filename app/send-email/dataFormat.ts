import { Seat, Places } from "../api/constant";
import moment from "moment";

export function SeatFormat(id: number, place: string) {
  const seatNumber = String(id).padStart(3, "0"); // '0001'
  const placeTag =
    Seat[Places.findIndex((pl) => pl === place)];
  return (
    placeTag + " " + seatNumber
  );
}

export function resultSplit(result_str: string) : {state: number, danwen: string, explaination: string} {
  const resultArray = result_str.split("\n\n");
  const filteredResultArray = resultArray.filter((item) => item.length > 0);
  if (filteredResultArray.length != 2) {
    console.warn("filteredResultArray.length < 2 | " , filteredResultArray.length);
    return {state: -1, danwen: filteredResultArray[0], explaination: ""};
  }
  return {state: 0, danwen: filteredResultArray[0], explaination: filteredResultArray[1]};
}

export function ticketDateFormat(dateString: string) {
  // Parse the date using the original format (YYYY年MM月DD日 HH:mm)
  const parsedDate = moment(dateString, 'YYYY年MM月DD日 HH:mm');
  
  // Reformat the date to the desired format (2022 DEC 12 HH:mm)
  // 'MMM' will give you the abbreviated month name in English.
  return parsedDate.format('DD MMM YYYY');
}