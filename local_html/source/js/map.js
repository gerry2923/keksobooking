// import {getDataLocal} from "./data-local.js";
import { createCard } from "./cards.js";
import { showError } from "./pop-up.js";
import { DATA_ARRAY_LENGTH, setData, getArrayLength } from "./data-server.js";
import { comparePins } from "./filter.js";

let isMapLoaded = false;
let mainPinMarker = {};
let map = {};
let pinMapLayerGoup = {};
const MAIN_PIN_X = 35.67820294777757;
const MAIN_PIN_Y = 139.76420661194183;

const loadMap = () => {
  try {
    // создание объекта карты
    map = L.map('map')
      .on('load', () => {isMapLoaded = true;})
      .setView([35.67820294777757, 139.76420661194183], 12);
    
    // создание объекта карточного слоя  
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // добавление карточного слоя
    osm.addTo(map);
    changeFlag();
    // создание объекта иконки главного пина
    const mainPinIcon = L.icon({
      // iconUrl: 'leaflet/img/main-pin.svg',
      iconUrl: 'img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    // создание главного пина
    mainPinMarker = L.marker(
      {
        lat: MAIN_PIN_X, 
        lng: MAIN_PIN_Y
      },
      {
        draggable: true,
        icon: mainPinIcon,
      },
    );

    // добавление главного пина
    mainPinMarker.addTo(map);
    // создаем групповой слой, в который будем добавлять пины
    pinMapLayerGoup = L.layerGroup().addTo(map);
    // добавить событие на изменение положения ползунка
    
    return isMapLoaded;

  } catch (error) {
    showError(error);
  }
};

const setMainPinCoord = (lat = MAIN_PIN_X, lng = MAIN_PIN_Y) => {
  let latlng = L.latLng(lat, lng);
  mainPinMarker.setLatLng(latlng);

  // var lat = (e.latlng.lat);
  // var lng = (e.latlng.lng);
  // var latlng = L.latLng(5454, 6565);
  // marker.setLatLng([lat, lng]).update();
};

const getMainPinCoord = () => {
  const coord = mainPinMarker.getLatLng();  
  return `${coord.lat.toFixed(6)}, ${coord.lng.toFixed(6)}`;
};

const removeMap = () => {
  map.remove();
};

const setMainPinEvent = (changeInput, cb) => {
  mainPinMarker.on('moveend', (evt) => {
    changeInput(`${evt.target.getLatLng().lat.toFixed(6)}, ${evt.target.getLatLng().lng.toFixed(6)}`);
    cb();
  });
};

const comparePinsCoordinates = (pinA, pinB) => {
  const currentMainPinCoord = mainPinMarker.getLatLng();

  const diffPinAX = pinA.location.lat - currentMainPinCoord.lat;
  const diffPinAY = pinA.location.lng - currentMainPinCoord.lng;
  
  const diffPinBX = pinB.location.lat - currentMainPinCoord.lat;
  const diffPinBY = pinB.location.lng - currentMainPinCoord.lng;

  const distanceA = Math.sqrt(diffPinAX*diffPinAX + diffPinAY*diffPinAY);
  const distanceB = Math.sqrt(diffPinBX*diffPinBX + diffPinBY*diffPinBY);

  return distanceA - distanceB;
};

const setDataPins = (array) => {

  pinMapLayerGoup.clearLayers();

  Array.from(array)
    .slice()
    .sort(comparePinsCoordinates)
    .slice(0, 30)
    .sort(comparePins)
    .slice(0, DATA_ARRAY_LENGTH)
    .forEach(obj => 
    {
      const pinIcon = L.icon(
        {
          iconUrl: "img/pin.svg",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        }
      );

      const pinMarker = L.marker(
        {
          lat: obj.location.lat,
          lng: obj.location.lng, 
        },
        {
          icon: pinIcon
        },
      )
      .bindPopup(
        createCard(obj),
        {
          keepInView: true,
        },
      )
      pinMarker.addTo(pinMapLayerGoup);
    }
  );
};

const changeFlag = () => {
  const flag = document.querySelector('.leaflet-attribution-flag');
  // flag.innerHTML = `<rect fill="#fff" width="12" height="9"/>
  // <rect fill="#D52B1E" y="6" width="12" height="6"/>
  // <rect fill="#0039A6" y="3" width="12" height="3"/>`;
  // flag.setAttribute("height", "9");
  // flag.setAttribute("viewBox", "0 0 12 9")
  
    flag.innerHTML = `<defs>
        <clipPath id="p">
          <path  d="m0 0h200v608h8v284l-8 8H0z"/>
        </clipPath>
      </defs>
      <path fill="#ce1720" d="m0 0h378v189H0z"/>
      <g transform="matrix(.21,0,0,.21,2,0)" clip-path="url(#p)" fill="#fff">
        <g id="b">
          <path id="a" d="m36 0v14h-9v14H16v16H8v13H-8V24H8V6H-8V0zm26 77v15h-8v12h-8V92h-8V77h-8V57h8V42h8V30h8v12h8v15h8v20zm-17-1h10V58H45zM19 183h8v-18h-8zm54 0h8v-18h-8zM-8 305H6v13h6v16h9v15h12v-15h9v-16h8v-13H38v-15h21v10h13v17h11v19h-8v14h-7v13h-6v14h-9v12h-7v11h-9v14H24v-15h-9v-14H8v-9H-8v-23H8v-20H-8z"/>
          <use xlink:href="#a" transform="matrix(-1,0,0,1,200,0)"/>
          <path d="m96 0v32h8V0h32v14h-8v14h-12v16h-8v13H92V44h-8V28H72V14h-8V0zm-2 274v-11h-6v-13h-7v-14h-8v-14h-8v-10h-9v-14H44v14h-9v10h-7v14h-8v14h-6v13H8v17H-8v-44H8v-20H-8v-33H8v14h10v14h10v-14h10v-14h8v-18h-8v-14H28v-14H18v14H8v14H-8v-41H8v-19H-8V77H8v13h8v16h11v13h9v15h7v12h14v-12h7v-15h9v-13h11V90h8V77h16v13h8v16h11v13h9v15h7v12h14v-12h7v-15h9v-13h11V90h8V77h16v28h-16v19h16v41h-16v-14h-10v-14h-10v14h-10v14h-8v18h8v14h10v14h10v-14h10v-14h16v33h-16v20h16v44h-16v-17h-6v-13h-6v-14h-8v-14h-7v-10h-9v-14h-12v14h-9v10h-8v14h-8v14h-7v13h-6v11zm2-167v27h8v-27zm-4 58v-14H82v-14H72v14H62v14h-8v18h8v14h10v14h10v-14h10v-14h16v14h10v14h10v-14h10v-14h8v-18h-8v-14h-10v-14h-10v14h-10v14zm4 46v27h8v-27z"/>
        </g>
        <use xlink:href="#b" transform="matrix(1,0,0,-1,0,900)"/>
        <path d="m-8 408H8v14h7v8h8v14h7v12h-7v14h-8v8H8v14H-8zm216 0v84h-16v-14h-7v-8h-8v-14h-7v-12h7v-14h8v-8h7v-14zM62 459h8v-18h-8zm76 0v-18h-8v18zm-42-59h8v-18h-8zm0 100v18h8v-18zm-50-75h14v-11h10v-10h5v-10h6v-14h8v-14h4v-13h14v13h4v14h8v14h6v10h5v10h10v11h14v50h-14v11h-10v10h-5v10h-6v14h-8v14h-4v13H93v-13h-4v-14h-8v-14h-6v-10h-5v-10H60v-11H46zm50 9v-15h-8v-10h-8v25h8v9h5v14h-5v9h-8v25h8v-10h8v-15h8v15h8v10h8v-25h-8v-9h-5v-14h5v-9h8v-25h-8v10h-8v15z"/>
      </g>
      <path fill="#007c30" d="m44 126h334v63H44z"/>`;
  
      flag.setAttribute("height", "6");
      flag.setAttribute("viewBox", "0 0 378 189");
};

export {loadMap, setDataPins,getMainPinCoord, setMainPinEvent,setMainPinCoord};





