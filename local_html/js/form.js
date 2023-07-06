import { createFetchPost } from './fetch.js';
import { checkEnterKey } from './util.js';
import { getMainPinCoord, setMainPinCoord } from './map.js';
import { showError, showSuccessMsg } from './pop-up.js';
import { clearFilter } from './filter.js';

const HousingPricePerNight = {
  "flat": 1000,
  "bungalow" : 0,
  "house": 5000,
  "palace": 10000,
  "hotel": 3000
};

const HousingForGuests = {
  "1": ["1"],
  "2": ["1", "2"],
  "3": ["1", "2", "3"],
  "100": ["0"]
};


const housing = document.querySelector('#type');
const price = document.querySelector('#price'); 
const timein = document.querySelector('#timein');
const timeoutList = document.querySelectorAll('#timeout option');
const capacity = document.querySelector(".capacity");  

const form = document.querySelector('.ad-form');
const btnSubmit = document.querySelector('.ad-form__submit');
const btnReset = document.querySelector('.ad-form__reset');

const onChangePricePerNight = (evt) => {
  const key = evt.target.selectedOptions[0].value;

  if (HousingPricePerNight.hasOwnProperty(key)) {
      
    price.min = HousingPricePerNight[key];
    price.placeholder = HousingPricePerNight[key];
    price.value = "";
  }
}; 

const onTimeinTimeoutChange = (evt) => {

  const key = evt.target.selectedOptions[0].value;
  const targetOption = Array.from(timeoutList).find(opt => opt.value === key);
  targetOption.selected = targetOption ? true : false;
  // не рассматривается случай, когда список времени заезда отличается от списка выезда
  // по умолчанию они одинаковые
};


housing.addEventListener("change", onChangePricePerNight);
timein.addEventListener("change", onTimeinTimeoutChange)


// --- validation -- you can check event 'invalid'
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
const title = document.querySelector(".title");
const addressInput = document.querySelector('#address');

addressInput.setAttribute('tabindex', '-1');
addressInput.setAttribute('onmousedown', 'return false');
addressInput.setAttribute('onselectstart', 'return false');

const setAddress = (address) => {
  addressInput.value = address;
};


title.addEventListener("input", (evt) => {
  
  const valueLength = title.value.length;

  if(valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity("Еще" + (MIN_TITLE_LENGTH - valueLength) + " симв.");
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity("Удалите лишние " + (valueLength - MAX_TITLE_LENGTH) + " симв.");
  } else {
    title.setCustomValidity("");
  }

  title.reportValidity();
});

price.addEventListener("input", (evt) => {
  const minValue = evt.target.min;
  const number = parseInt(evt.target.value);
  
  if( number && (number >= 0)){
    if(number < minValue) {
      price.setCustomValidity("Минимальная цена для данного типа жилья "  + minValue);
    } else if (number > MAX_PRICE_LENGTH) {
      price.setCustomValidity("Ну это уже грабеж средь бела дня!!! " + MAX_PRICE_LENGTH + "!!! и ни рубля больше!");
    } else {
      price.setCustomValidity("");
    }
  } else {
    price.setCustomValidity("Принимаются только целые положительные числа");
  }
  price.reportValidity();
});



const rooms = document.querySelector(".rooms");

const resetCapacity = () => {
  Array.from(capacity.children).forEach(child => {
    child.style.display = "block";
    child.removeAttribute("selected");
  });
}

const setCapacity = (selectedOption = '1') => {
  const capacityOptionList = capacity.children;
  //  массив возможных вариантов количества гостей
  const checkSet = new Set (HousingForGuests[selectedOption]);
  let isSelected = false;

  Array.from(capacityOptionList).map(option => {
    if(!checkSet.has(option.value)) {
      option.style.display = "none";
    } else {
      if(!isSelected) {
        option.setAttribute("selected", "");
        isSelected = true;
      }
    }
  });  
};


const configureCapacity = (evt) => {
  resetCapacity();
  setCapacity(evt.target.selectedOptions[0].value);
};

resetCapacity();
setCapacity();
rooms.addEventListener("change", configureCapacity);
// rooms.dispatchEvent(new Event('change'));

const resetToDefaultSelection = (elements, attribute, compareStr='') => {
  Array.from(elements).forEach(element => {
    if(element.hasAttribute(attribute)){
      element.removeAttribute(attribute); 
    }

    if(element.value === compareStr) {
      element.setAttribute(attribute, '');
    }
  });
};

const resetToDefaultCheckBox = (elements, checkVal = '') => {
  Array.from(elements).forEach(element => {
    if(element.checked === true) {
      element.checked = false;
    }

    if(element.value === checkVal) {
      element.checked = true;
    }
  });
};

const clearForm = () => {
  
  setMainPinCoord();
  form.querySelector('#address').value = getMainPinCoord();
  form.querySelector('#avatar').value = null;
  form.querySelector('#title').value = '';  
  form.querySelector('#description').value = '';
  form.querySelector('#images').value = null;

  form.querySelector('#price').min = '0';
  form.querySelector('#price').placeholder = '0';
  form.querySelector('#price').value = '';

  resetToDefaultSelection(form.querySelector('#capacity').children, 'selected', '1');
  setCapacity();

  resetToDefaultSelection(form.querySelector('#type').children, 'selected', 'bungalow');
  resetToDefaultSelection(form.querySelector('#timein').children, 'selected', '12:00');
  resetToDefaultSelection(form.querySelector('#timeout').children, 'selected', '12:00');
  resetToDefaultSelection(form.querySelector('#room_number').children, 'selected', '1');
  resetToDefaultCheckBox(form.querySelectorAll('.feature__checkbox'));
  
  clearFilter();
};

const sendDataSuccess = () => {
  clearForm();
  showSuccessMsg();
};


const sendFrom = createFetchPost(sendDataSuccess, showError,form);

const onSubmit = (evt) => {
  evt.preventDefault();
  sendFrom();
};

const onSubmitKey = (evt)=> {
  evt.preventDefault();
  if(checkEnterKey(evt.key)) {
    form.dispatchEvent(new Event('submit'));
  }
};

form.addEventListener('submit', onSubmit);
btnSubmit.addEventListener('keydown', onSubmitKey);


const onResetClick = (evt) => {
  evt.preventDefault();
  clearForm();
};

const onResetKey = (evt) => {
  evt.preventDefault();
  if(checkEnterKey(evt.key)) {
    clearForm();
  }
};


export const setClearFilterEvent = (cb) => {
  btnReset.addEventListener('click', (evt) => {
    console.log('clicking');
    onResetClick(evt);
    clearFilter();
    console.log(cb);
    cb();
  });

  btnReset.addEventListener('keydown', (evt) => {
    onResetKey(evt);
    clearFilter();
    cb();
  });
};

btnReset.addEventListener('click', onResetClick);
btnReset.addEventListener('keydown', onResetKey);

export {setAddress};
