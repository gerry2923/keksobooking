export { DATA_ARRAY_LENGTH, setData, getArrayLength };
const DATA_ARRAY_LENGTH = 10;

let dataArray = [];

const setData = (obj) => {
  
  dataArray.push(obj);
  // console.log(dataArray.length);
};

const getData = (index) => {
  return dataArray[index];
};

const getArrayLength = () => {
  return dataArray.length;
};