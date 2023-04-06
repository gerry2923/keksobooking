import {loadMap, setDataPins} from "./map.js";
// import {loadCards} from "./cards.js";

const addressInput = document.querySelector("#address");
// addressInput.setAttribute("readonly", "");
addressInput.setAttribute("onmousedown", "return false");
addressInput.setAttribute("onselectstart", "return false");

const setInactiveState = (className, childClassName) => {
  const form  = document.querySelector("."+className);
  form.classList.add(className + "--disabled");
  const fsl = form.querySelectorAll(childClassName);

  for( const fs of fsl) {
    fs.setAttribute("disabled", "");
  }
};

const setActiveState = (className, childClassName) => {
  const form  = document.querySelector("."+className);
  form.classList.remove(className + "--disabled");
  const fsl = form.querySelectorAll(childClassName);

  for( const fs of fsl) {
    fs.removeAttribute("disabled");
  }
};

const setAddresCoord = (mainPin, adrInp) => {
  const coord = mainPin.getLatLng();
  adrInp.value = `${coord.lat.toFixed(6)}, ${coord.lng.toFixed(6)}`;
};

setInactiveState("ad-form", ".ad-form__element");
setInactiveState("map__filters", ".map__filter");

const loadObj = loadMap();

if(loadObj[0]) {
  setActiveState("ad-form", ".ad-form__element");
  setActiveState("map__filters", ".map__filter");

  const mainPinMarker = loadObj[1];
  setAddresCoord(mainPinMarker, addressInput);

  mainPinMarker.on('moveend', (evt) => {
    setAddresCoord(evt.target, addressInput);
  });

  setDataPins();
}




