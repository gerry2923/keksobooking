import { hideMap, showMap } from "./util.js";

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

const showError = (err) => {
  const elem = createErrorPopUp(err);
  const btnClose = elem.querySelector(".error__button");
  
  btnClose.addEventListener("click", closePopUpclick);
  document.addEventListener("keydown", closePopUpKey);

  hideMap(); 
};

export {showError};