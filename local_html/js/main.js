/**
 * @param {number} min  - минимальное значение предела
 * @param {number} max - максимальное значение предела
 * возвращает целое число в пределах от  min до max
 */

const rand = (min, max) => {
    return ( min > max) ? -1 : Math.random() * (max - min) + min;
};

/**
 * возвращает случайное число с плав точкой из переданного диапазона включительно
 * диапазон толькло положительный, включая ноль
 * 
 */

const getRandFloat = (min, max, fixing) => {
    return ((min > max) && (max < 0)) ? -1 : +(Math.random() * (max - min) + min).toFixed(fixing);
};

console.error(rand(5, 10));
console.error(getRandFloat(0.3, 4.2, 2));