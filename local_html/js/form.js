const HousingPricePerNight = {
  "flat": 1000,
  "bungalow" : 0,
  "house": 5000,
  "palace": 10000,
  "hotel": 3000
};

const housing = document.querySelector('#type');
const price = document.querySelector('#price'); 
const timein = document.querySelector('#timein');
const timeoutList = document.querySelectorAll('#timeout option');  

const onChangePricePerNight = (evt) => {
  const key = evt.target.selectedOptions[0].value;

  if (HousingPricePerNight.hasOwnProperty(key)) {
      
    price.min = HousingPricePerNight[key];
    price.placeholder = HousingPricePerNight[key];
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