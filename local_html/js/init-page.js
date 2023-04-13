import {loadMap, setDataPins, getMainPinCoord, setMainPinEvent} from './map.js';
import { setAddress } from './form.js'; 
import { showError } from './error.js';
import { createFetch } from './fetch.js';

/**
 * 
 * @param {*} selector  - класс или id элемента, детей первой вложенности которого надо отключить или включить 
 * @param {*} off  - отключить элемент (true) или включить (false)
 */
const toggleAccessChildren = (selector, off = true) => {

  const children = Array.from(document.querySelector(selector).children);

  if(off) {
    children.forEach(child => child.setAttribute('disabled', ''));
  } else {
    children.forEach(child => child.removeAttribute('disabled'));
  }

};
/**
 * 
 * @param {*} selector - класс или if элемента, который надо отключить или включить
 * @param {*} off  - отключить элемент (true), включить - (false)
 */

const toggleAccessElement = (selector, off = true) => {
  
  const className = (selector[0] === '.' ? 
    selector.replace('.', '') : selector.replace('#', ''))  + '--disabled';
  
  const element = document.querySelector(selector);
  
    if(off) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
  
};

const setInactiveState = () => {
  toggleAccessElement('.map__filters');
  toggleAccessChildren('.map__filters');
  toggleAccessElement('.ad-form');
  toggleAccessChildren('.ad-form');
};

const setActiveState = () => {
  // загрузка карты
  if(loadMap()) {
    try {
    toggleAccessElement('.map__filters', false);
    toggleAccessChildren('.map__filters', false);
    toggleAccessElement('.ad-form', false);
    toggleAccessChildren('.ad-form', false);

    setAddress(getMainPinCoord());
    setMainPinEvent(setAddress);
    getData();

    } catch (error){
      showError(error);
    }
  } 
};

const getData = createFetch(setDataPins, showError, 'GET');
setInactiveState();
setActiveState();

  
  
  





