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


// --- validation --
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
const title = document.querySelector(".title");

/*
title.addEventListener('invalid', () => {
  if(title.validity.tooShort){
    title.setCustomValidity("Название должно состоять минимум из 2-х символов");
  }else if(title.validity.tooLong) {
    title.setCustomValidity("Название не должно превышать 25-ти символов");
  } else if(title.validity.valueMissing){
    title.setCustomValidity("Обязательное поле");
  } else {
    title.setCustomValidity = "";
  }  
});
*/

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

const setCapacity = (evt) => {
  resetCapacity();
  const capacityOptionList = capacity.children;
  const checkSet = new Set (HousingForGuests[evt.target.selectedOptions[0].value]);
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


rooms.addEventListener("change", setCapacity);
