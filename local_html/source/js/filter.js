/**
 * 
 * 1. Определить критерии фильтрации
 * 2. произвести рейтинг
 * 3. отсортировать
 * 
 */

const housingType = document.getElementById('housing-type');
const housingPrice = document.getElementById('housing-price');
const housingRooms = document.getElementById('housing-rooms');
const housingGuests = document.getElementById('housing-guests');

const housingFeaturesList = document.querySelectorAll("#housing-features input[type='checkbox']");

let filterObj = {
  'type': '',
  'price': '',
  'rooms': '',
  'guests': '',
  'features': []
};

const clearFilterObj = () => {
  filterObj.type = '';
  filterObj.price = '';
  filterObj.rooms = '';
  filterObj.guests = '';
  filterObj.features = [];
};

export const clearFilter = () => {
  housingType.options[0].selected = true;
  housingPrice.options[0].selected = true;
  housingRooms.options[0].selected = true;
  housingGuests.options[0].selected = true;

  for(let i = 0; i < housingFeaturesList.length; i++) {
    if(housingFeaturesList[i].checked === true) {
      housingFeaturesList[i].checked = false;
    }
  }

  clearFilterObj();
};

const updateFilterObj = () => {
  filterObj.type = housingType.value;
  filterObj.price = housingPrice.value;
  filterObj.rooms = housingRooms.value;
  filterObj.guests = housingGuests.value;

  filterObj.features = [];

  for(let i = 0; i < housingFeaturesList.length; i++) {
    if(housingFeaturesList[i].checked === true) {
      filterObj.features.push(housingFeaturesList[i].value);
    }
  }

};

const getRank = (pin) => {

  let rank = 0;

  if(pin.offer.type === filterObj.type) {
    rank += 6;
  }

  if(pin.offer.price === filterObj.price) {
    rank += 6;
  }

  if( pin.offer.rooms === filterObj.rooms) {
    rank += 6;
  }

  if ( pin.offer.guests === filterObj.guests) {
    rank += 6
  }

  let featuresLength = filterObj.features.length;

  if( featuresLength ) {
    filterObj.features.map( feature => {

      if(pin.offer.features) {
        if( pin.offer.features.includes(feature) ) {
          rank+=6;
        }
      }
      
    });
  }
  return rank;
};

export const comparePins = (PinA, PinB) => {
  const rankA = getRank(PinA);
  const rankB = getRank(PinB);
  
  // сортировка по убыванию
  return rankB - rankA;
};

const setChangeEvent = (element, cb) => {
  element.addEventListener("change", (evt) => {
    updateFilterObj();
    cb();
  });
};

export const setFilterHandler = (cb) => {
  // открытый пин закрывается самостоятельно
  setChangeEvent(housingType, cb);
  setChangeEvent(housingPrice, cb);
  setChangeEvent(housingRooms, cb);
  setChangeEvent(housingGuests, cb);

  for (const element of housingFeaturesList) {
    setChangeEvent(element, cb);
  }
};

