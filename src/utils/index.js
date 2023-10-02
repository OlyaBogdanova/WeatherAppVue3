export const capitalizeFirstLetter = (str) => {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const PRESSURE_UNUTS = 0.750062;
export const getPressureMm = (hpa) => {
  return Math.round(hpa * PRESSURE_UNUTS);
};

export const getTime=(sec)=>{
    return new Date(sec*1000).toLocaleTimeString('ru-RU', {timeZone:'Atlantic/Reykjavik'})

}
