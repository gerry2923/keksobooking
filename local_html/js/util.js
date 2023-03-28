
/**
 * @param {number} min  - минимальное значение предела
 * @param {number} max - максимальное значение предела
 * возвращает дробное число в пределах от  min до max
 */

const getRandFloat = (min, max) => {
  return ( min > max) ? -1 : Math.random() * (max - min) + min;
};

/**
 * 
 * @param {*} min минимальная граница 
 * @param {*} max максимальная граница
 * @returns случайное целое число между min и max включительно
 */

const getRandInt = (min, max)=> {
return (min > max)? -1 : Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
* возвращает случайное число с плав точкой из переданного диапазона включительно
* диапазон толькло положительный, включая ноль
* 
*/

const getRandFloatFormated = (min, max, fixing) => {
  return ((min > max) && (max < 0)) ? -1 : +(Math.random() * (max - min) + min).toFixed(fixing);
};

/**
* 
* @param {*} array - длинна массива есть максимальная граница max предела случайного числа
* @param {*} min  - минимальная граница предела случайного числа
* @returns возвращает случайное целое число в пределах от min до max
*/
const getRandIntFromArray = (array, min = 0) => {
  return getRandInt(min, array.length - 1);
};

/**
* 
* @param {*} min минимальное случайное число
* @param {*} max максимальное случайное число
* @param {*} total количество символов в результате
* @param {*} fill заполняющий символ (01, 001, 00003)
* @returns возвращает строку со случайным числом от min до max в заданном формате
*/

const getRandIntFormated = (min, max, total, fill) => { 
  return getRandInt(min, max).toString().padStart(total, fill);
};

export {getRandFloat, getRandInt, getRandFloatFormated, getRandIntFromArray, getRandIntFormated};