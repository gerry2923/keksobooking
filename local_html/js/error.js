// 1. создать всплывающее окно
// 2. добавить обработку закрытия
// 3. 
const errorTemplate = document.querySelector('#error').content.querySelector(".error");

const createErrorPopUp = (text) => {
  const errTempl = errorTemplate.cloneNode(true);
  errTempl.querySelector(".error__message").textContent = text;
  errTempl.querySelector(".error__button").textContent = "Close";
  errTempl.setAttribute('style', 'z-index: 100');
  errTempl.setAttribute('style', 'overflow: visible');
  document.body.appendChild(errTempl);
  return errTempl;
};


const closePopUpKey = (evt) => {
  if((evt.key === "Esc") || (evt.key === "Escape")) {
    removePopUp(document.querySelector(".error__button"));
  } 
};

const closePopUpclick = (evt) => {
  removePopUp(evt.target);
};

const removePopUp = (elem) => {
  document.removeEventListener("keydown", closePopUpKey);
  elem.parentNode.remove();

  showMap();
} 
// заменить две функции одной с проверкой регулярными выражениями
// map.getAttribute('style') -> дает строку со всеми характеристиками стиля, в которой надо найти нужное свойство + сделать проверку map.hasAttribute('style')

const hideMap = ()=> {
  const map = document.querySelector('#map');
  if (map !== null) {
      map.style.display = "none";
    }
  };

const showMap = () => {
  const map = document.querySelector('#map');
  if(map !== null) {
    map.style.display = "block";
  }
};

const showError = (err) => {
  const elem = createErrorPopUp(err);
  const btnClose = elem.querySelector(".error__button");
  
  btnClose.addEventListener("click", closePopUpclick);
  document.addEventListener("keydown", closePopUpKey);

  hideMap(); 
};

export {showError};