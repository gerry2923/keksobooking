import { hideMap, showMap, checkEscapeKey } from "./util.js";

const errorTemplate = document.querySelector('#error').content.querySelector(".error");
const successMsgTemplate = document.querySelector('#success').content.querySelector(".success");


const createErrorPopUp = (text) => {
  const errTempl = errorTemplate.cloneNode(true);
  errTempl.querySelector(".error__message").textContent = text;
  errTempl.querySelector(".error__button").textContent = "Close";
  errTempl.setAttribute('style', 'z-index: 100');
  errTempl.setAttribute('style', 'overflow: visible');
  document.body.appendChild(errTempl);
};

const createSuccessPopUp = () => {
  const successTempl = successMsgTemplate.cloneNode(true);
  successTempl.querySelector('.success__message').innerHTML = `Ваше объявление<br>успешно размещено!`;
  document.body.appendChild(successTempl);
};

const closeKeyErrorMsg = (evt) => {
  if(checkEscapeKey(evt.key)) {
    const elem = document.querySelector('.error');
    removePopUp(elem);
  } 
};

const closeClickErrorMsg = () => {
  const elem = document.querySelector('.error');
  console.log(elem);
  removePopUp(elem);
};

const removePopUp = (elem) => {
  console.log(elem);
  elem.remove();
  document.removeEventListener('keydown', closeKeyErrorMsg);
  document.removeEventListener('click', closeClickErrorMsg);
  showMap();
} 

const showError = (err) => {
  createErrorPopUp(err);
  document.addEventListener("keydown", closeKeyErrorMsg);
  document.addEventListener('click', closeClickErrorMsg);
  hideMap(); 
};

const onClickHideSuccessMsg =(evt) => {
  evt.preventDefault();
  removeSuccessMsg();
};

const onEscHideSuccessMsg = (evt) => {
  evt.preventDefault();
  if(checkEscapeKey(evt.key)) {
    console.log('all correct');
    removeSuccessMsg();
  }
};

const removeSuccessMsg = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onEscHideSuccessMsg);
  document.removeEventListener('pointerdown', onClickHideSuccessMsg);
  showMap();
};

const showSuccessMsg = () => {
  createSuccessPopUp();
  hideMap(); 
  
  document.addEventListener('keydown', onEscHideSuccessMsg);
  document.addEventListener('pointerdown', onClickHideSuccessMsg);

//   // setTimeout(() => {
//   //   hideSuccessMsg(message);
//   //   showMap();
//   // }, 5000);
};

export {showError, showSuccessMsg};