/* global _:readonly */


import {loadMap, setDataPins, getMainPinCoord, setMainPinEvent} from './map.js';
import { setAddress, setClearFilterEvent } from './form.js'; 
import { showError } from './pop-up.js';
import { createFetchGet } from './fetch.js';
import { setFilterHandler } from './filter.js';

const RERENDER_DELAY = 500;

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
    
    
    // setMainPinEvent(setAddress);
    
    // getData();
    getDataAndSetFilter();

    } catch (error){
      showError(error);
    }
  } 
};

// const getData = createFetchGet(setDataPins, showError);

const getDataAndSetFilter = createFetchGet( (pins) => {

  setDataPins(pins);

  setFilterHandler(_.debounce(() => setDataPins(pins), RERENDER_DELAY));

  setMainPinEvent(setAddress, () => setDataPins(pins));

  setClearFilterEvent(() => setDataPins(pins));

},showError );


setInactiveState();
setActiveState();

  
  
  





