console.log("in map js");
let isMapLoaded = false;
const addressInput = document.querySelector("#address");


const loadMap = () => {
  return [isMapLoaded, mainPinMarker];
};

var map = L.map('map')
  .on('load', () => {isMapLoaded = true;})
  .setView([35.67820294777757, 139.76420661194183], 12);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.67820294777757, 
    lng: 139.76420661194183
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
  
mainPinMarker.addTo(map);

export {loadMap};






